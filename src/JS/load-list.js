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
    const taskElement = document.getElementById(`task-${taskId}`);
    if (!taskElement) {
        console.error(`Task element with ID task-${taskId} not found`);
        return;
    }
    
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const completer = window.prompt("User name which completed the task:");
    
    if (!completer) {
        checkbox.checked = false;
        return;
    }

    let foundUser = globalUsers.find(user => 
        user.firstName.toLowerCase() === completer.trim().toLowerCase()
    );

    if (!foundUser || !userArray.includes(foundUser.firstName)) {
        console.error("Invalid user or user not in list");
        checkbox.checked = false;
        return;
    }

    try {
        const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isCompleted })
        });
        if (!response.ok) {
            console.warn(`Failed to update task ${taskId} via API. Simulating update.`);
        }
    } catch (error) {
        console.warn(`Error updating task ${taskId}:`, error, "Simulating update.");
    }

    if (isCompleted) {
        extraPoints[foundUser.id] = (extraPoints[foundUser.id] || 0) + 10;
        console.log(`Task ${taskId} was completed by ${foundUser.firstName}!`);
        loadLeaderboard();
        
        const taskIndex = todos.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            todos[taskIndex].completed = true;
        }
        
        taskElement.remove();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadLeaderboard();
    fetchTodos();
});

let todos = [];

async function fetchTodos() {
    try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        todos = data.todos.filter(todo => !todo.completed);
        renderTodos();
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

function renderTodos() {
    const todoListElement = document.getElementById("todo-list");
    if (!todoListElement) return;

    todos.forEach(todo => {
        if (!document.getElementById(`task-${todo.id}`)) {
            const taskElement = document.createElement("div");
            taskElement.id = `task-${todo.id}`;
            taskElement.className = "todo task-item";
            
            taskElement.innerHTML = `
                <input type="checkbox">
                <span>${todo.todo}</span>
            `;
            
            const checkbox = taskElement.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => updateTaskCompletion(todo.id, checkbox.checked));
            
            todoListElement.appendChild(taskElement);
        }
    });
}
