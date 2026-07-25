#!/usr/bin/env node

const GITHUB_API_URL = "https://api.github.com/users";

class GitHubUserLookup {
    /**
     * Creates an instance of GitHubUserLookup.
     */
    constructor() {
        this.apiUrl = GITHUB_API_URL;
    }

    /**
     * Validates if a username is provided.
     * @param {string} username - GitHub username.
     * @returns {boolean} True if the username is valid.
     */
    isUsernameValid(username) {
        return !!username;
    }

    /**
     * Fetches GitHub user data from the API.
     * @param {string} username - GitHub username.
     * @returns {Promise<Object>} User data from GitHub API.
     * @throws {Error} If the API request fails or user is not found.
     */
    async fetchGitHubUser(username) {
        const response = await fetch(`${this.apiUrl}/${encodeURIComponent(username)}`);

        if (response.status === 404) {
            throw new Error(`GitHub user not found: ${username}`);
        }

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        return response.json();
    }

    /**
     * Prints the GitHub user summary.
     * @param {Object} userData - User data from GitHub API.
     */
    printUserSummary(userData) {
        console.log("Name:", userData.name);
        console.log("Username:", userData.login);
        console.log("Profile:", userData.html_url);
        console.log("Public repos:", userData.public_repos);
        console.log("Followers:", userData.followers);
    }

    /**
     * Main function to execute the script.
     * @param {string[]} args - Command line arguments.
     */
    async run(args) {
        const username = args[2];

        if (!this.isUsernameValid(username)) {
            process.stderr.write("error: please provide a GitHub username\n");
            process.exit(1);
        }

        try {
            const userData = await this.fetchGitHubUser(username);
            this.printUserSummary(userData);
        } catch (error) {
            process.stderr.write(`error: ${error.message}\n`);
            process.exit(1);
        }
    }
}

// Execute the script
const githubLookup = new GitHubUserLookup();
githubLookup.run(process.argv);
