//this part of for the age api implementation from digidates
async function getProjectAge(projectCreationDate) {
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
        const response = await fetch(url);
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

    } catch (error) {
        console.error("Error fetching age data:", error);
    }
}


//this part of for the progress bar api implementation from digidates
async function getProgressbar(projectCreationDate, projectEndDate) {
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
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        document.getElementById('progress').innerText = `${data.percent}%`;

        // Update progress bar visual
        document.getElementById('progress').style.setProperty('--progress-width', data.percent + "%");

    } catch (error) {
        console.error("Error fetching progress data:", error);
    }
}


//this part of for the countdown api implementation from digidates
async function getCountdown(projectEndDate) {
    const url = `https://digidates.de/api/v1/countdown/${projectEndDate}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Check the actual response structure for error handling
        console.log(data); 

        // Corrected property access based on the actual API response
        const { days, daysonly } = data;

        document.getElementById('countdown').innerText = 
            `${daysonly} days until the due date`;
    } catch (error) {
        console.error("Error fetching countdown data:", error);
    }
}