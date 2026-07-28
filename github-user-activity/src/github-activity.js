#!/usr/bin/env node

const { GitHubActivityFetcher } = require('./GitHubActivityFetcher');

const username = process.argv[2];
if (!username) {
    console.error("Please provide a GitHub username.");
    process.exit(1);
}

const fetcher = new GitHubActivityFetcher();
fetcher
    .fetchActivity(username)
    .then((events) => {
        fetcher.displayActivity(events);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
