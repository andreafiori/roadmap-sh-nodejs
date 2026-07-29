// Write an unit test for GitHubUserLookup.js class
describe('GitHubUserLookup', () => {
    let GitHubUserLookup;
    let gitHubUserLookup;

    beforeAll(() => {
        GitHubUserLookup = require('../../src/github-profile-details/GitHubUserLookup');
        gitHubUserLookup = new GitHubUserLookup();
    });

    test('isUsernameValid should return true for valid username', () => {
        expect(gitHubUserLookup.isUsernameValid('octocat')).toBe(true);
    });

    test('isUsernameValid should return false for empty username', () => {
        expect(gitHubUserLookup.isUsernameValid('')).toBe(false);
    });

    test('fetchGitHubUser should throw error for non-existing user', async () => {
        await expect(gitHubUserLookup.fetchGitHubUser('nonexistinguser1234567890')).rejects.toThrow('GitHub user not found: nonexistinguser1234567890');
    });
});