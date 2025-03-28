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

        // Attach event listener to the checkbox
        checkbox.addEventListener('change', function () {
          updateTaskCompletion(todo.id, checkbox.checked); // Update task status when checkbox changes
        });

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

function openSubmenu() {
  // Get the button and submenu
  const button = document.getElementById('open-submenu-btn');
  const submenu = document.getElementById('add-task-submenu');

  // Add a click event listener to the button
  button.addEventListener('click', function(event) {
    // Prevent the event from propagating to the window click listener
    event.stopPropagation();

    // Toggle the visibility of the submenu
    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'block'; // Show the submenu
    } else {
        submenu.style.display = 'none'; // Hide the submenu
    }
  });

  // Optional: Close the submenu if the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (!event.target.closest('#add-task-btn') && !event.target.closest('#add-task-submenu')) {
        submenu.style.display = 'none';
    }
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

async function updateTaskCompletion(taskId, isCompleted) {
  const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        completed: isCompleted
    })
  });

  if (response.ok) {
    console.log(`Task ${taskId} updated successfully!`);
  } else {
    console.error(`Failed to update task ${taskId}.`);
  }
}

function displayUsersAsRadioButtons(users) {
  const container = document.getElementById('users-container');
  container.innerHTML = ''; // Clear the container before adding new content

  users.forEach((user, index) => {
    const radioBtnWrapper = document.createElement('div');
    radioBtnWrapper.classList.add('radio-wrapper');

    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'user'; // All radio buttons share the same name
    radioBtn.id = `user-${index}`; // Unique ID for each radio button
    radioBtn.value = user.id; // Assuming the user object has an 'id' field

    const label = document.createElement('label');
    label.setAttribute('for', `user-${index}`);
    label.textContent = `${user.firstName}`;

    radioBtnWrapper.appendChild(radioBtn);
    radioBtnWrapper.appendChild(label);
    container.appendChild(radioBtnWrapper);
  });
}




///////////////////// End ChatGPT generated code - rheanafrancesca /////////////////////