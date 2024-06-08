document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        taskItem.appendChild(taskText);

        const taskButtons = document.createElement('div');
        taskButtons.classList.add('task-buttons');

        const completeButton = document.createElement('input');
        completeButton.type = 'checkbox';
        completeButton.checked = task.completed;
        completeButton.addEventListener('change', function () {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskButtons.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function () {
            const newText = prompt('Edit task', taskText.textContent);
            if (newText) {
                taskText.textContent = newText;
                saveTasks();
            }
        });
        taskButtons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            saveTasks();
        });
        taskButtons.appendChild(deleteButton);

        taskItem.appendChild(taskButtons);
        taskList.appendChild(taskItem);
    }

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        } else {
            alert('Task cannot be empty.');
        }
    });

    loadTasks();
});
