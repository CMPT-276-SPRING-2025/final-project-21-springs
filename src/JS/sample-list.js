///////////////////// ChatGPT generated/assisted code - rheanafrancesca /////////////////////
function getSingleUsersTodos(userId) {
    fetch(`https://dummyjson.com/users/${userId}/todos`)
        .then(res => res.json())
        .then(data => {
            // Get the todoList container to display the todos
            const todoListContainer = document.getElementById('todo-list');

            // Loop through todos and create an element for each todo
            data.todos.forEach(todo => {
                const todoElement = document.createElement('div');
                todoElement.classList.add('todo');

                if (todo.completed) {
                    todoElement.classList.add('completed');
                } else {
                    todoElement.classList.add('not-completed');
                }

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;
                checkbox.disabled = false;

                // Create a span to show the todo task
                const todoText = document.createElement('span');
                todoText.textContent = todo.todo;

                // Append checkbox and todo text to the todoElement
                todoElement.appendChild(checkbox);
                todoElement.appendChild(todoText);
                
                todoListContainer.appendChild(todoElement);
            });
        })
        .catch(error => console.error('Error fetching todos for user:', error)); // Handle any errors
}

///////////////////// End ChatGPT generated code - rheanafrancesca /////////////////////



