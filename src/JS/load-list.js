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

///////////////////// End ChatGPT generated code - rheanafrancesca /////////////////////

export { fetchUsers };