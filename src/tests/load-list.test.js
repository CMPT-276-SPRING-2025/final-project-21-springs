import { fetchUsers } from '../JS/load-list.js';

async function testFetchUsers() {
    console.log("Running: testFetchUsers");

    try {
        // Fetch user data for the first 3 users
        const result = await fetchUsers(0, 3);

        // Assert that the result contains user id, firstName and lastName for each user
        result.forEach(user => {
            console.assert(
                user.id !== undefined && user.firstName !== undefined && user.lastName !== undefined,
                "❌ testFetchUsers failed: Missing id, firstName or lastName"
            );
        })
        
        console.log("✅ testFetchUsers passed");
    } catch (error) {
        console.error("❌ testFetchUsers failed", error);
    }
}

testFetchUsers();