function getSingleUsersTodos(userId) {
  fetch(`https://dummyjson.com/users/${userId}/todos`)
      .then(res => res.json())
      .then(data => {
          const todoListContainer = document.getElementById('todo-list');
          data.todos
              .filter(todo => !todo.completed) // Only incomplete tasks
              .forEach(todo => {
                  if (!document.getElementById(`task-${todo.id}`)) {
                      const todoElement = document.createElement('div');
                      todoElement.id = `task-${todo.id}`;
                      todoElement.className = 'todo task-item';

                      todoElement.innerHTML = `
                          <input type="checkbox">
                          <span>${todo.todo}</span>
                      `;

                      const checkbox = todoElement.querySelector('input[type="checkbox"]');
                      checkbox.addEventListener('change', () => updateTaskCompletion(todo.id, checkbox.checked));

                      todoListContainer.appendChild(todoElement);
                      
                      if (!todos.some(t => t.id === todo.id)) {
                          todos.push(todo);
                      }
                  }
              });
      })
      .catch(error => console.error('Error fetching todos for user:', error));
}

function addTask(taskInput, userIdInput) {
  const taskData = {
      todo: taskInput,
      completed: false,
      userId: userIdInput,
      id: Date.now()
  };

  fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
  })
  .then(res => res.json())
  .then(data => {
      if (data && data.todo) {
          const newTask = { ...data, id: taskData.id };
          todos.push(newTask);
          
          const todoListContainer = document.getElementById('todo-list');
          const todoElement = document.createElement('div');
          todoElement.id = `task-${taskData.id}`;
          todoElement.className = 'todo task-item';

          todoElement.innerHTML = `
              <input type="checkbox">
              <span>${data.todo}</span>
          `;

          const checkbox = todoElement.querySelector('input[type="checkbox"]');
          checkbox.addEventListener('change', () => updateTaskCompletion(taskData.id, checkbox.checked));

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