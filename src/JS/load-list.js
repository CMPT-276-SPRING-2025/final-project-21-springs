///////////////////// ChatGPT generated/assisted code - rheanafrancesca /////////////////////

// Function to fetch user data from the DummyJSON API through user ID
function fetchUsers(start,end,listId) {
    fetch('https://dummyjson.com/users')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Display the users
        const users = data.users.slice(start, end);

        // Map user information into an array and join them into one line
        const usersList = users.map(user => `${user.firstName}`).join(', ');

        document.getElementById(listId).textContent = usersList;
    })
    .catch(error => {
        console.error('Error fetching users:', error);
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

///////////////////// End ChatGPT generated code - rheanafrancesca /////////////////////