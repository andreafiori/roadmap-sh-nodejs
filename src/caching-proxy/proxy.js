const http = require('http');
const { getCachedResponse, setCachedResponse } = require('./cache');
const { request: httpRequest } = require('http');
const { request: httpsRequest } = require('https');

function forwardRequest(req, origin, callback) {
    const url = new URL(req.url, origin);
    const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: req.method,
        headers: req.headers,
    };

    const requester = url.protocol === 'https:' ? httpsRequest : httpRequest;
    const proxyReq = requester(options, (proxyRes) => {
        let data = [];
        proxyRes.on('data', (chunk) => data.push(chunk));
        proxyRes.on('end', () => {
            const response = {
                statusCode: proxyRes.statusCode,
                headers: proxyRes.headers,
                body: Buffer.concat(data).toString(),
            };
            callback(response);
        });
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy request error:', err);
        callback(null);
    });

    req.pipe(proxyReq);
}

function startProxyServer(port, origin) {
    const server = http.createServer((req, res) => {
        const cachedResponse = getCachedResponse(req);
        if (cachedResponse) {
            res.writeHead(cachedResponse.statusCode, {
                ...cachedResponse.headers,
                'X-Cache': 'HIT',
            });
            res.end(cachedResponse.body);
            return;
        }

        forwardRequest(req, origin, (response) => {
            if (response) {
                setCachedResponse(req, response);
                res.writeHead(response.statusCode, {
                    ...response.headers,
                    'X-Cache': 'MISS',
                });
                res.end(response.body);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Proxy request failed');
            }
        });
    });

    server.listen(port, () => {
        console.log(`Caching proxy server running on port ${port}, forwarding to ${origin}`);
    });
}

module.exports = { startProxyServer };