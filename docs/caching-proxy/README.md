# Caching server

A NodeJS CLI tool that starts a caching proxy server, it will forward requests to the actual server and cache the responses. If the same request is made again, it will return the cached response instead of forwarding the request to the server.

## Run with npm

Commands:

    # Start proxy
    npm run caching-proxy -- --port 3000 --origin http://dummyjson.com

    # Clear cache
    npm run caching-proxy -- --clear-cache

Install it globally (optional):

    npm i -g
    caching-proxy -- --clear-cache

## Requirements

User should be able to start the caching proxy server by running a command like following:

    npm run caching-proxy -- --port <number> --origin <url>

--port is the port on which the caching proxy server will run.
--origin is the URL of the server to which the requests will be forwarded.

OR

--clear-cache Clear proxy cache

## Proxy check

First request (cache miss):

    curl http://localhost:3000/product

Second request (cache hit):

    curl http://localhost:3000/products
