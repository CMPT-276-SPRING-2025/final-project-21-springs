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

function addTask(taskInput, userIdInput) {
  const taskData = {
    todo: taskInput,
    completed: false,
    userId: userIdInput
  }

  // Use API to simulate adding a new task
  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  .then(res => res.json())
  .then(data => {
    if (data && data.todo) {
      // Get the custom to do list element
      const todoListContainer = document.getElementById('todo-list');

      // Create the new todo element
      const todoElement = document.createElement('div');
      todoElement.classList.add('todo');

      // Add the completed or not-completed class
      if (data.completed) {
        todoElement.classList.add('completed');
      } else {
        todoElement.classList.add('not-completed');
      }

      // Create the checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = data.completed;
      checkbox.disabled = false;

      // Create a span for the todo text
      const todoText = document.createElement('span');
      todoText.textContent = data.todo;

      // Append checkbox and todo text to the todoElement
      todoElement.appendChild(checkbox);
      todoElement.appendChild(todoText);
      
      // Add the new task to the DOM
      todoListContainer.appendChild(todoElement);
    } else {
      alert('Failed to add task.');
    }
  })
  .catch(error => {
    console.error('Error adding todo:', error);
    alert('Error adding task.');
  });
}

function addTaskButton() {
  document.getElementById('add-task-btn').addEventListener('click', function() {
    // Get the user input from the input field
    const taskInput = document.getElementById('new-task-input').value.trim();
    const userId = 5; // Replace with the actual user ID you are working with

    if (taskInput) {
        console.log('Adding task:', taskInput);
        // Call addUserTodo function to add the new task
        addTask(taskInput, userId);

        // Optionally, clear the input field after adding the task
        document.getElementById('new-task-input').value = '';
    } else {
        alert('Please enter a task.');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  addTaskButton();
});

///////////////////// End ChatGPT generated code - rheanafrancesca /////////////////////