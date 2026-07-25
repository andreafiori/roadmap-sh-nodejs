#!/usr/bin/env node

import { argv } from 'node:process';
import { open } from 'node:fs/promises';

/**
 * Reads and parses a JSON file.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<Object>} Parsed JSON data.
 * @throws {Error} If the file cannot be read or JSON is invalid.
 */
async function readAndParseJsonFile(filePath) {
    const buffer = Buffer.alloc(1024);
    let fileHandle;

    try {
        fileHandle = await open(filePath, 'r');
        await fileHandle.read(buffer);
        const stringRep = buffer.toString().replace(/\0/g, ''); // Remove null characters
        return JSON.parse(stringRep);
    } finally {
        await fileHandle?.close();
    }
}

/**
 * Validates if a file path is provided.
 * @param {string} filePath - File path to validate.
 * @returns {boolean} True if the file path is valid.
 */
function isFilePathValid(filePath) {
    return !!filePath;
}

/**
 * Prints formatted JSON data.
 * @param {Object} data - JSON data to print.
 */
function printFormattedJson(data) {
    const formattedJson = JSON.stringify(data, null, '\t');
    console.log(formattedJson);
}

/**
 * Main function to execute the script.
 */
async function main() {
    const filePath = argv[2];

    if (!isFilePathValid(filePath)) {
        console.error('error: please provide a JSON file path');
        process.exit(1);
    }

    try {
        const jsonData = await readAndParseJsonFile(filePath);
        printFormattedJson(jsonData);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`error: could not read file: ${filePath}`);
        } else {
            console.error(`error: invalid JSON in file: ${filePath}`);
        }
        process.exit(1);
    }
}

// Execute the script
await main();