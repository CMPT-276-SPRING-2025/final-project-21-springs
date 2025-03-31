import { updateTaskCompletion } from '../JS/sample-list.js';

async function testUpdateTaskCompletion() {
    console.log("Running: testUpdateTaskCompletion");

    // Sample task to be updated
    const sampleData = {
        taskId: 1,
        isCompleted: true
    };

    try {
        // Update task completion status of sample data
        const result = await updateTaskCompletion(sampleData.taskId, sampleData.isCompleted);   
        console.log("✅ testUpdateTaskCompletion passed");
    } catch (error) {
        console.error("❌ testUpdateTaskCompletion failed", error);
    }


}

testUpdateTaskCompletion();