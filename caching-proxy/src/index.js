#!/usr/bin/env node

const { startProxyServer } = require('./proxy');
const { clearCache } = require('./cache');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('port', {
        type: 'number',
        describe: 'Port for the caching proxy server',
    })
    .option('origin', {
        type: 'string',
        describe: 'Origin server URL to forward requests to',
    })
    .option('clear-cache', {
        type: 'boolean',
        describe: 'Clear the cache',
    })
    .check((argv) => {
        if (!argv.clearCache && (!argv.port || !argv.origin)) {
            throw new Error('Missing required arguments: port, origin');
        }
        return true;
    })
    .argv;

if (argv.clearCache) {
    clearCache();
    console.log('Cache cleared!');
    process.exit(0);
}

startProxyServer(argv.port, argv.origin);
