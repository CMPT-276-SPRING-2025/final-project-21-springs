import { getProjectAge , getProgressbar, getCountdown } from "../JS/digidates.js";
import { assertEqual, mockFetch } from "./test-helpers.js";

// Mock the global `document` object for testing in a Node.js environment
global.document = {
    getElementById: function(id) {
        if ((id === 'age') || (id === 'countdown')) {
            return { innerText: '' }; // Mock element with innerText
        }
        if (id === 'progress') {
            return { 
                innerText: '', 
                style: { 
                    properties: {}, // Store properties in an object
                    setProperty: function(name, value) { 
                        this.properties[name] = value; 
                    },
                    getProperty: function(name) { 
                        return this.properties[name] || ''; 
                    }
                }
            } 
        };
        return null;
    }
};

async function testMockGetProjectAge() {
    console.log("⏱️ Running testMockGetProjectAge()...\n");

    // Test 1: Project with years, months, and days
    let result = await getProjectAge("2022-01-01", mockFetch({ ageextended: { years: 2, months: 3, days: 10 } }));
    let expected = "The project is 2 years, 3 months and 10 days old";
    assertEqual(result, expected, "getProjectAge with input years, months, and days");

    // Test 2: Project less than a month old
    result = await getProjectAge("2024-03-15", mockFetch({ ageextended: { years: 0, months: 0, days: 15 } }));
    expected = "The project is 15 days old";
    assertEqual(result, expected, "getProjectAge for projects less than a month old");

    // Test 3: API failure case
    result = await getProjectAge("2020-05-20", () => Promise.reject(new Error("API failed")));
    expected = undefined;
    assertEqual(result, expected, "getProjectAge handles API failure");

    console.log("\ntestMockGetProjectAge() completed.\n");
}

async function testMockGetProgressbar() {
    console.log("⏱️ Running testMockGetProgressbar()...\n");

    // Test 1: Progress percentage is displayed correctly
    let result = await getProgressbar("2024-01-01", "2024-12-31", mockFetch({ percent: 75 }));
    let expected ='75%';
    assertEqual(result, expected, "getProgressbar displays correct percentage");

    // Test 2: API failure handling
    result = await getProgressbar("2024-01-01", "2024-12-31", () => Promise.reject(new Error("API failed")));
    expected = undefined;
    assertEqual(result, expected, "getProgressbar handles API failure");

    console.log("\ntestMockGetProgressbar() completed.\n");
}

async function testMockGetCountdown() {
    console.log("⏱️ Running testMockGetCountdown()...\n");

    // Test 1: Project days
    let result = await getCountdown("2025-12-31", mockFetch({ daysonly: 2 }));
    let expected = "2 days until the due date";
    assertEqual(result, expected, "getCountdown days");

    // Test 2: API failure
    result = await getCountdown("2025-05-20", () => Promise.reject(new Error("API failed")));
    expected = undefined;
    assertEqual(result, expected, "getCountdown handles API failure");

    console.log("\ntestMockGetCountdown() completed.\n");
}


// Run the test
async function runTests() {
    console.log("🏃 Running all tests...\n");

    await testMockGetProjectAge();
    await testMockGetProgressbar();
    await testMockGetCountdown();

    console.log("All tests completed.");
}

// Call the function to start tests
runTests();