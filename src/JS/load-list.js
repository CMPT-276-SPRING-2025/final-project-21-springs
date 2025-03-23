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

let sampleList1Btn = document.querySelector(".samplelist1");

sampleList1Btn.addEventListener("click", () => {
    window.location.href = "sample-list1.html";
});

// Dates for Lists
displayFixedDate('2025-04-08', "date-id1");
displayFixedDate('2025-06-12', "date-id2");
displayFixedDate('2025-05-27', "date-id3");

// Users for Lists
fetchUsers(0,3,"users-id1");
fetchUsers(3,6,"users-id2");
fetchUsers(6,9,"users-id3");