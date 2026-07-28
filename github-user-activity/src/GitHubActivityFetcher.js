class GitHubActivityFetcher {
    constructor(fetchFunction = fetch) {
        this.fetch = fetchFunction;
    }

    async fetchActivity(username) {
        const response = await this.fetch(
            `https://api.github.com/users/${username}/events`,
            {
                headers: {
                    "User-Agent": "node.js",
                },
            }
        );

        if (!response.ok) {
            this.handleError(response);
        }

        return response.json();
    }

    handleError(response) {
        if (response.status === 404) {
            throw new Error("User not found. Please check the username.");
        } else {
            throw new Error(`Error fetching data: ${response.status}`);
        }
    }

    displayActivity(events) {
        const activityList = Object.values(events);
        if (activityList.length === 0) {
            console.log("No recent activity found.");
            return;
        }

        activityList.forEach((event) => {
            const action = this.getActionDescription(event);
            console.log(`- ${action}`);
        });
    }

    getActionDescription(event) {
        switch (event.type) {
            case "PushEvent": {
                const commitCount = event.payload.commits?.length || 0;
                return `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
            }
            case "IssuesEvent":
                return `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in ${event.repo.name}`;
            case "WatchEvent":
                return `Starred ${event.repo.name}`;
            case "ForkEvent":
                return `Forked ${event.repo.name}`;
            case "CreateEvent":
                return `Created ${event.payload.ref_type} in ${event.repo.name}`;
            default:
                return `${event.type.replace("Event", "")} in ${event.repo.name}`;
        }
    }
}

module.exports = { GitHubActivityFetcher };