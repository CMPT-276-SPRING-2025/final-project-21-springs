//this part of for the age api implementation from digidates
async function getProjectAge(projectCreationDate, fetchFn = fetch) {
    const url = `https://digidates.de/api/v1/age/${projectCreationDate}`;

    //this part of the code for checking if there is a property under ageextended that is 0, if so it will not be displayed.
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
        return "Error fetching age data";
    }
}

//this part of for the progress bar api implementation from digidates
async function getProgressbar(projectCreationDate, projectEndDate, fetchFn = fetch){
    const url = `https://digidates.de/api/v1/progress?start=${projectCreationDate}&end=${projectEndDate}`;

    try {
        const response = await fetchFn(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let progressPercent = `${data.percent}%`;
        document.getElementById('progress').innerText = progressPercent;

        //this part of the code helps the visual green progress bar to be shown on the webpage
        document.getElementById('progress').style.setProperty('--progress-width', data.percent + "%");
        return progressPercent;

    } catch (error) {
        console.error("Error fetching progress data:", error);
        return "Error fetching progress data";
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
        return "Error fetching countdown data";
    }
}

// Make function available globally for the browser
if (typeof window !== "undefined") {
    window.getProjectAge = getProjectAge;
}

// Export for testing (only works in a Node.js test environment)
if (typeof module !== "undefined" && module.exports) {
    module.exports = { getProjectAge, getProgressbar, getCountdown };
}