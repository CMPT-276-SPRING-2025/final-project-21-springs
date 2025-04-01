function fetchUsers(start, end) {
    return fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            return data.users.slice(start, end);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            return [];
        });
}

let userArray = [];
function displayUsers(users, listId) {
    const usersList = users.map(user => `${user.firstName}`).join(', ');
    userArray = users.map(user => `${user.firstName}`);
    document.getElementById(listId).textContent = usersList;
    console.log("Member list:", userArray);
}

function fetchThenDisplayBasic(start, end, userIds) {
    fetchUsers(start, end)
        .then(users => {
            displayUsers(users, userIds);
        });
}

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

async function loadLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    try {
        const usersResponse = await fetch("https://dummyjson.com/users");
        const usersData = await usersResponse.json();
        let users = usersData.users;
        globalUsers = users;

        const todosResponse = await fetch("https://dummyjson.com/todos");
        const todosData = await todosResponse.json();
        let todos = todosData.todos;

        let apiPoints = {};
        todos.forEach(todo => {
            if (todo.completed) {
                apiPoints[todo.userId] = (apiPoints[todo.userId] || 0) + 10;
            }
        });

        let allUsers = users.map(user => {
            let points = (apiPoints[user.id] || 0) + (extraPoints[user.id] || 0);
            return { name: user.firstName, id: user.id, points: points };
        });

        allUsers = allUsers.filter(user => userArray.includes(user.name));

        allUsers.sort((a, b) => b.points - a.points);

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
    try {
        const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: isCompleted })
        });
        if (!response.ok) {
            console.warn(`Failed to update task ${taskId} via API. Simulating update.`);
        }
    } catch (error) {
        console.warn(`Error updating task ${taskId}:`, error, "Simulating update.");
    }

    const completer = window.prompt("User name which completed the task:");
    if (completer) {
        let foundUser = globalUsers.find(user => user.firstName.toLowerCase() === completer.trim().toLowerCase());
        if (foundUser) {
            if (userArray.includes(foundUser.firstName)) {
                extraPoints[foundUser.id] = (extraPoints[foundUser.id] || 0) + 10;
                console.log(`Task ${taskId} was completed by ${foundUser.firstName}!`);
                loadLeaderboard();
            } else {
                console.error("The entered user is not a member of the list.");
            }
        } else {
            console.error("User not found in the fetched data.");
        }
    }
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);