# JSON formatter

A Node.js CLI tool that reads a JSON file and prints formatted JSON to the terminal.

Node version: 20+

## Usage

    node json-formatter.js user.json
    node json-formatter.js broken.json
    node json-formatter.js missing.json
    node json-formatter.js

## Constraints

If the file contains invalid JSON, print a friendly error:

    error: invalid JSON in file: broken.json

If the file cannot be read, print this error:

    error: could not read file: missing.json

If the user does not pass a file path, print this error:

    error: please provide a JSON file path
