function fetchUsers(start, end) {
    return fetch('https://dummyjson.com/users')
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Slice the users data to get the specified range
            return data.users.slice(start, end);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            return []; // Return an empty array in case of error
        });
}

// Function to display the users (member list)
let userArray = [];
function displayUsers(users, listId) {
    // Map user information into an array and join them into one line
    const usersList = users.map(user => `${user.firstName}`).join(', ');
    
    // Update the member list array
    userArray = users.map(user => `${user.firstName}`);

    // Display the users in the specified element
    document.getElementById(listId).textContent = usersList;
    console.log("Member list:", userArray);
}

function fetchThenDisplayBasic(start, end, userIds) {
    fetchUsers(start, end)
        .then(users => {
            displayUsers(users, userIds);
        });
}

// Function to display a fixed date
function displayFixedDate(inputDate, dateId) {
    const fixedDate = new Date(inputDate + 'T00:00:00');
    const formattedDate = fixedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById(dateId).textContent = formattedDate;
}


let globalUsers = [];
let extraPoints = {};

// Modified loadLeaderboard function to merge API points and extraPoints
// and then filter only the users in the member list (userArray)
async function loadLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    try {
        // Fetch users and store globally
        const usersResponse = await fetch("https://dummyjson.com/users");
        const usersData = await usersResponse.json();
        let users = usersData.users;
        globalUsers = users;  // store users for later lookup

        // Fetch todos (tasks)
        const todosResponse = await fetch("https://dummyjson.com/todos");
        const todosData = await todosResponse.json();
        let todos = todosData.todos;

        // Calculate points from API tasks (10 points per completed task)
        let apiPoints = {};
        todos.forEach(todo => {
            if (todo.completed) {
                apiPoints[todo.userId] = (apiPoints[todo.userId] || 0) + 10;
            }
        });

        // Merge API points with any extra points added manually
        let allUsers = users.map(user => {
            let points = (apiPoints[user.id] || 0) + (extraPoints[user.id] || 0);
            return { name: user.firstName, id: user.id, points: points };
        });

        // Filter to include only users that are in the member list (userArray)
        allUsers = allUsers.filter(user => userArray.includes(user.name));

        // Sort users by points in descending order
        allUsers.sort((a, b) => b.points - a.points);

        // Build and display the leaderboard HTML
        let htmlString = "";
        allUsers.forEach(user => {
            htmlString += `<li>${user.name} - ${user.points}</li>`;
        });
        leaderboardElement.innerHTML = htmlString;
    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}

async function updateTaskCompletion(taskId, isCompleted) {
    const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: isCompleted })
    });

    if (response.ok) {
        const completer = window.prompt("User name which completed the task:");
        if (completer) {
            // Find the user in globalUsers by first name (case-insensitive)
            let foundUser = globalUsers.find(user => user.firstName.toLowerCase() === completer.trim().toLowerCase());
            if (foundUser) {
                // Only update if the user is in the member list (userArray)
                if (userArray.includes(foundUser.firstName)) {
                    // Add 10 points to the user's extra points
                    extraPoints[foundUser.id] = (extraPoints[foundUser.id] || 0) + 10;
                    console.log(`Task ${taskId} was completed by ${foundUser.firstName}!`);
                    // Update the leaderboard to reflect the new points
                    loadLeaderboard();
                } else {
                    console.error("The entered user is not a member of the list.");
                }
            } else {
                console.error("User not found in the fetched data.");
            }
        }
    } else {
        console.error(`Failed to update task ${taskId}.`);
    }
}

// Call leaderboard function on page load
document.addEventListener("DOMContentLoaded", loadLeaderboard);