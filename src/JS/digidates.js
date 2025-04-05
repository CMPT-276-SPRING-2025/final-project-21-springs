let fetch;

if (typeof window !== 'undefined' && window.fetch) {
    // Use browser's native fetch
    fetch = window.fetch;
} else {
    // Use a synchronous static import for Node.js
    import('node-fetch').then(module => {
        fetch = module.default;
    }).catch(err => {
        console.error("Failed to load node-fetch:", err);
    });
}


//this part of for the age api implementation from digidates
async function getProjectAge(projectCreationDate, fetchFn = fetch) {

    const today = new Date();
    const projectDate = new Date(projectCreationDate);

    // Format dates to YYYY-MM-DD for accurate comparison
    const todayFormatted = today.toISOString().split('T')[0];
    const projectFormatted = projectDate.toISOString().split('T')[0];

    // Check if the project has not begun yet
    if (projectFormatted > todayFormatted) {
        document.getElementById('age').innerText = "The project has not begun yet.";
        return; // Stop execution if the project hasn't started
    }

    const url = `https://digidates.de/api/v1/age/${projectCreationDate}`;

    try {
        const response = await fetchFn(url);
        const data = await response.json();
        const { ageextended } = data;

        let ageText = "The project is ";
        if (ageextended.years > 0) {
            ageText += `${ageextended.years} ${ageextended.years === 1 ? 'year' : 'years'}`;
        }
        if (ageextended.months > 0) {
            if (ageextended.years > 0) ageText += ", ";
            ageText += `${ageextended.months} ${ageextended.months === 1 ? 'month' : 'months'}`;
        }
        if (ageextended.days > 0 || (ageextended.years === 0 && ageextended.months === 0)) {
            if (ageextended.years > 0 || ageextended.months > 0) ageText += " and ";
            ageText += `${ageextended.days} ${ageextended.days === 1 ? 'day' : 'days'}`;
        }
        ageText += " old";

        document.getElementById('age').innerText = ageText;
        return ageText;
    } catch (error) {
        console.error("Error fetching age data:", error);
    }
}


//this part of for the progress bar api implementation from digidates
async function getProgressbar(projectCreationDate, projectEndDate, fetchFn = fetch){
    const today = new Date();
    const projectDate = new Date(projectCreationDate);

    // Format dates to YYYY-MM-DD for accurate comparison
    const todayFormatted = today.toISOString().split('T')[0];
    const projectFormatted = projectDate.toISOString().split('T')[0];

    // Check if the project has not started yet
    if (projectFormatted > todayFormatted) {
        document.getElementById('progress').innerText = "0%";
        document.getElementById('progress').style.setProperty('--progress-width', "0%");
        return; // Stop execution if the project hasn't started
    }

    const url = `https://digidates.de/api/v1/progress?start=${projectCreationDate}&end=${projectEndDate}`;

    try {
        const response = await fetchFn(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let progressPercent = `${data.percent}%`;
        document.getElementById('progress').innerText = progressPercent;

        // Update progress bar visual
        document.getElementById('progress').style.setProperty('--progress-width', data.percent + "%");
        
        return progressPercent;
    } catch (error) {
        console.error("Error fetching progress data:", error);
    }
}


//this part of for the countdown api implementation from digidates
async function getCountdown(projectEndDate, fetchFn = fetch) {
    const url = `https://digidates.de/api/v1/countdown/${projectEndDate}`;

    try {
        const response = await fetchFn(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const { days, daysonly } = data;

        let countdownText = `${daysonly} days until the due date`
        document.getElementById('countdown').innerText = countdownText;
        return countdownText;
    } catch (error) {
        console.error("Error fetching countdown data:", error);
    }
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", function(){
        let inputDate = document.getElementById("list-startDate");
        let deadline = document.getElementById("list-deadline");
        let today = new Date().toISOString().split("T")[0];
        inputDate.setAttribute("min", today);
        deadline.setAttribute("min", today);
    });
}

// Export for testing
export { getProjectAge, getProgressbar, getCountdown };
export { fetch };