// Helper function for test logging
export function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASSED: ${testName}`);
    } else {
        console.error(`❌ FAILED: ${testName}\n   Expected: "${expected}"\n   Got: "${actual}"`);
    }
}

// Mock fetch function
export function mockFetch(responseData) {
    return function () {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(responseData),
        });
    };
}