const { GitHubActivityFetcher } = require("../../src/github-user-activity/GitHubActivityFetcher");

describe("GitHubActivityFetcher", () => {
    it("should fetch and display activity", async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ "0": { type: "PushEvent", repo: { name: "test/repo" }, payload: { commits: [{}] } } }),
        });

        const fetcher = new GitHubActivityFetcher(mockFetch);
        const events = await fetcher.fetchActivity("testUser");
        fetcher.displayActivity(events);
        expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404,
        });

        const fetcher = new GitHubActivityFetcher(mockFetch);
        await expect(fetcher.fetchActivity("testUser")).rejects.toThrow("User not found. Please check the username.");
    });

    it("should display no activity message", () => {
        const fetcher = new GitHubActivityFetcher();
        console.log = jest.fn();
        fetcher.displayActivity({});
        expect(console.log).toHaveBeenCalledWith("No recent activity found.");
    });
});