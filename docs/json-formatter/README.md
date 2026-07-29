# JSON formatter

A Node.js CLI tool that reads a JSON file and prints formatted JSON to the terminal.

Node version: 20+

## Usage

    npm run json-formatter -- user.json
    npm run json-formatter -- broken.json
    npm run json-formatter -- missing.json
    npm run json-formatter

## Constraints

If the file contains invalid JSON, print a friendly error:

    error: invalid JSON in file: broken.json

If the file cannot be read, print this error:

    error: could not read file: missing.json

If the user does not pass a file path, print this error:

    error: please provide a JSON file path
