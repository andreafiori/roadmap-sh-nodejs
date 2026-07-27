#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

function logError(message) {
    console.error(`Error: ${message}`);
}

/**
 * Counts files and folders in a given directory.
 * @param {string} dirPath - Path to the directory.
 * @returns {Promise<{fileCount: number, folderCount: number}>} Counts of files and folders.
 */
async function countEntries(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    let fileCount = 0;
    let folderCount = 0;

    for (const entry of entries) {
        if (entry.isDirectory()) {
            folderCount++;
        } else {
            fileCount++;
        }
    }

    return { fileCount, folderCount };
}

/**
 * Validates if a path exists and is a directory.
 * @param {string} dirPath - Path to validate.
 * @returns {Promise<boolean>} True if the path is a valid directory.
 */
async function isValidDirectory(dirPath) {
    try {
        const stat = await fs.stat(dirPath);
        return stat.isDirectory();
    } catch (err) {
        logError(`${err.message}`);
        return false;
    }
}

/**
 * Prints the summary of a directory.
 * @param {string} dirPath - Path to the directory.
 * @param {number} fileCount - Number of files.
 * @param {number} folderCount - Number of folders.
 */
function printSummary(dirPath, fileCount, folderCount) {
    const folderName = path.basename(dirPath);
    console.log(`Folder:  ${folderName}`);
    console.log(`Path:    ${dirPath}`);
    console.log(`Files:   ${fileCount}`);
    console.log(`Folders: ${folderCount}`);
}

/**
 * Main function to execute the script.
 * @param {string[]} args - Command line arguments.
 */
async function main(args) {
    const targetArg = args[2];
    const targetPath = targetArg ? path.resolve(process.cwd(), targetArg) : process.cwd();

    if (!(await isValidDirectory(targetPath))) {
        logError(`Folder not found or is not a directory: "${targetPath}"`);
        process.exit(1);
    }

    const { fileCount, folderCount } = await countEntries(targetPath);
    printSummary(targetPath, fileCount, folderCount);
}

// Execute the script
await main(process.argv)
    .catch(err => {
        logError(err.message);
        process.exit(1);
    });
