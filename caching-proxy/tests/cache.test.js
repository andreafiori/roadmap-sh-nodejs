const {
    getCachedResponse,
    setCachedResponse,
    clearCache,
} = require('../src/cache');

describe('Cache', () => {
    beforeEach(() => {
        clearCache();
    });

    test('should return null for non-cached requests', () => {
        const mockReq = { method: 'GET', url: '/test' };
        expect(getCachedResponse(mockReq)).toBeNull();
    });

    test('should return cached response for cached requests', () => {
        const mockReq = { method: 'GET', url: '/test' };
        const mockRes = { statusCode: 200, headers: {}, body: 'test' };
        setCachedResponse(mockReq, mockRes);
        expect(getCachedResponse(mockReq)).toEqual(mockRes);
    });

    test('should clear cache', () => {
        const mockReq = { method: 'GET', url: '/test' };
        const mockRes = { statusCode: 200, headers: {}, body: 'test' };
        setCachedResponse(mockReq, mockRes);
        clearCache();
        expect(getCachedResponse(mockReq)).toBeNull();
    });
});