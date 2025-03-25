///////////////////// ChatGPT generated/assisted code - rheanafrancesca /////////////////////

// Function to fetch user data from the DummyJSON API through user ID
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

// Function to display the users
function displayUsers(users, listId) {
    // Map user information into an array and join them into one line
    const usersList = users.map(user => `${user.firstName}`).join(', ');

    // Display the users in the specified element
    document.getElementById(listId).textContent = usersList;
}

function fetchThenDisplayBasic(start, end, userIds) {
    fetchUsers(start, end)
        .then(users => {
            displayUsers(users, userIds);
        })
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

///////////////////// End ChatGPT generated code - rheanafrancesca /////////////////////

async function loadLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    let userPoints = {};

    try {
        // Fetch users
        const usersResponse = await fetch("https://dummyjson.com/users");
        const usersData = await usersResponse.json();
        let users = usersData.users;

        // Fetch todos (tasks)
        const todosResponse = await fetch("https://dummyjson.com/todos");
        const todosData = await todosResponse.json();
        let todos = todosData.todos;

        // Assign points for completed tasks
        todos.forEach(todo => {
            if (todo.completed) {
                let userId = todo.userId;
                userPoints[userId] = (userPoints[userId] || 0) + 10; // 10 points per task
            }
        });

        // Map users with their points (excluding users with 0 points)
        let rankedUsers = users
            .map(user => ({
                name: `${user.firstName} ${user.lastName}`,
                points: userPoints[user.id] || 0
            }))
            .filter(user => user.points > 0); // Exclude users with 0 points

        // Fetch real users from localStorage
        const realUsers = JSON.parse(localStorage.getItem("realUsersPoints")) || [];

        // Merge, sort by points (descending), and exclude users with 0 points
        const allUsers = [...rankedUsers, ...realUsers]
            .filter(user => user.points > 0) // Exclude 0-point users
            .sort((a, b) => b.points - a.points);

        // Display leaderboard
        leaderboardElement.innerHTML = allUsers.length > 0
            ? allUsers.map(
                (user, index) => `<li>${index + 1}. ${user.name} - ${user.points} pts</li>`
            ).join("")
            : "<li>No users with points yet.</li>"; // Handle empty leaderboard case

    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}

// Call leaderboard function on page load
document.addEventListener("DOMContentLoaded", loadLeaderboard);
