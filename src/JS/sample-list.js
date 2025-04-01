function getSingleUsersTodos(userId) {
  fetch(`https://dummyjson.com/users/${userId}/todos`)
    .then(res => res.json())
    .then(data => {
      const todoListContainer = document.getElementById('todo-list');
      data.todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.disabled = false;

        const todoText = document.createElement('span');
        todoText.textContent = todo.todo + " " + todo.userId;

        todoElement.appendChild(checkbox);
        todoElement.appendChild(todoText);

        checkbox.addEventListener('change', function () {
          updateTaskCompletion(todo.id, checkbox.checked);
        });

        todoListContainer.appendChild(todoElement);
      });
    })
    .catch(error => console.error('Error fetching todos for user:', error));
}

function addTask(taskInput, userIdInput) {
  const taskData = {
    todo: taskInput,
    completed: false,
    userId: userIdInput
  };

  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  .then(res => res.json())
  .then(data => {
    if (data && data.todo) {
      const todoListContainer = document.getElementById('todo-list');

      const todoElement = document.createElement('div');
      todoElement.classList.add('todo');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = data.completed;
      checkbox.disabled = false;

      checkbox.addEventListener('change', function () {
        updateTaskCompletion(data.id, checkbox.checked);
      });

      const todoText = document.createElement('span');
      todoText.textContent = data.todo;

      todoElement.appendChild(checkbox);
      todoElement.appendChild(todoText);

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
  const button = document.getElementById('open-submenu-btn');
  const submenu = document.getElementById('add-task-submenu');

  button.addEventListener('click', function(event) {
    event.stopPropagation();

    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'block';
    } else {
        submenu.style.display = 'none';
    }
  });

  window.addEventListener('click', function(event) {
    if (!event.target.closest('#add-task-btn') && !event.target.closest('#add-task-submenu')) {
        submenu.style.display = 'none';
    }
  });
}

function addTaskButton() {
  document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task').value.trim();
    const taskDescription = document.getElementById("new-task-description").value.trim();
    const userId = 5;

    if (taskInput) {
      console.log('Adding task:', taskInput);
      addTask(taskInput, userId);
      document.getElementById('new-task').value = "";
      document.getElementById("new-task-description").value = "";
    } else {
      alert('Please enter a task.');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  addTaskButton();
});