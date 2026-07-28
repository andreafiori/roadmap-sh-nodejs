const cache = new Map();

const CACHE_TTL = 60 * 1000; // 1 minute TTL (adjust as needed)

function getCacheKey(req) {
    return `${req.method}:${req.url}`;
}

function getCachedResponse(req) {
    const key = getCacheKey(req);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.response;
    }
    return null;
}

function setCachedResponse(req, response) {
    const key = getCacheKey(req);
    cache.set(key, {
        response,
        timestamp: Date.now(),
    });
}

function clearCache() {
    cache.clear();
}

module.exports = {
    getCachedResponse,
    setCachedResponse,
    clearCache,
};