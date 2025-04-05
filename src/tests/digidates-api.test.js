import { getProjectAge , getProgressbar, getCountdown } from "../JS/digidates.js";
import fetch from 'node-fetch';

// initialize todaysDate for testing
const todaysDate = (new Date()).toISOString().split('T')[0];

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

async function testGetProjectAge() {
    console.log("⏱️ Running testGetProjectAge()...\n");

    // Test 1: Returns string for a valid response
    let result = await getProjectAge("2022-02-01", fetch);
    console.log(result);
    console.assert(result !== undefined,  "❌ FAILED: getProjectAge result is undefined");
    console.log("✅ PASSED: getProjectAge returns string");

    // Test 2: Returns error for invalid date
    result = await getProjectAge("2022-02-29", fetch);
    console.assert(result === undefined,  "❌ FAILED: getProjectAge result is not undefined");
    console.log("✅ PASSED: getProjectAge handles error for invalid date");

    // Test 3: Returns error for invalid date syntax
    result = await getProjectAge("2022-02-2", fetch);
    console.assert(result === undefined,  "❌ FAILED: getProjectAge result is not undefined");
    console.log("✅ PASSED: getProjectAge handles error for invalid date syntax");

    console.log("\ntestGetProjectAge() completed.\n");
}

async function testGetProgressbar() {
    console.log("⏱️ Running testGetProgressbar()...\n");

    // Test 1: Returns correct percentage for a 100% project (fixed start date - todays date)
    let result = await getProgressbar("2022-04-02", todaysDate, fetch);
    let expected = "100%";
    console.assert(result === expected,  "❌ FAILED: getProgressbar result is undefined");
    console.log("✅ PASSED: getProgressbar outputs 100%");

    console.log("\ntestGetProgressbar() completed.\n");
}

async function testGetCountdown() {
    console.log("⏱️ Running testGetCountdown()...\n");

    // Test 1: Returns correct countdown for todays date
    let result = await getCountdown(todaysDate, fetch);
    let expected = "0 days until the due date";
    console.assert(result === expected,  "❌ FAILED: getCountdown does not output the expected string");
    console.log("✅ PASSED: getCountdown outputs the expected string");

    // Test 2: Returns error for past date
    result = await getCountdown("2025-01-01", fetch);
    expected = undefined;
    console.assert(result === expected, "❌ FAILED: getCountdown returns a valid string");
    console.log("✅ PASSED: getCountdown handles error for a past date");

    console.log("\ntestGetCountdown() completed.\n");
}

async function runTests() {
    console.log("🏃 Running all tests...\n");

    await testGetProjectAge();
    await testGetProgressbar();
    await testGetCountdown();

    console.log("All tests completed.");
}

runTests();