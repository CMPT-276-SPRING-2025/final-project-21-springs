//this part of for the age api implementation from digidates
async function getProjectAge(projectCreationDate) {
    const url = `https://digidates.de/api/v1/age/${projectCreationDate}`;

    //this part of the code for checking if there is a property under ageextended that is 0, if so it will not be displayed.
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
async function getProgressbar(projectCreationDate, projectEndDate){
    const url = `https://digidates.de/api/v1/progress?start=${projectCreationDate}&end=${projectEndDate}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        document.getElementById('progress').innerText = `${data.percent}%`;

        //this part of the code helps the visual green progress bar to be shown on the webpage
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


document.addEventListener("DOMContentLoaded", function(){
    let inputDate = document.getElementById("list-startDate");
    let deadline = document.getElementById("list-deadline");
    let today=new Date().toISOString().split("T")[0];
    inputDate.setAttribute("min", today);
    deadline.setAttribute("min",today);
})