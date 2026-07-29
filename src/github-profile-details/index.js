#!/usr/bin/env node

const GitHubUserLookup = require('./GitHubUserLookup');

// Execute the script
const githubLookup = new GitHubUserLookup();
githubLookup.run(process.argv);
