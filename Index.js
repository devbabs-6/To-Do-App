document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'task-text';

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '&#10004;';
    completeButton.className = 'complete-btn';
    completeButton.onclick = () => {
        taskSpan.classList.toggle('completed');
        updateTaskCounter();
        saveTasks();
    };

    const editButton = document.createElement('button');
    editButton.innerHTML = '&#9998;';
    editButton.className = 'edit-btn';
    editButton.onclick = () => {
        const newText = prompt('Edit your task:', taskSpan.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskSpan.textContent = newText.trim();
            saveTasks();
        }
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';
    removeButton.onclick = () => {
        taskList.removeChild(listItem);
        updateTaskCounter();
        saveTasks();
    };

    listItem.appendChild(completeButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    taskInput.value = '';
    updateTaskCounter();
    saveTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskInput = document.getElementById('taskInput');
        taskInput.value = task.text;
        addTask();

        const taskList = document.getElementById('taskList');
        const lastTask = taskList.lastChild.querySelector('.task-text');

        if (task.completed) {
            lastTask.classList.add('completed');
        }
    });

    document.getElementById('taskInput').value = '';
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('.task-text').textContent;
        const isCompleted = li.querySelector('.task-text').classList.contains('completed');

        tasks.push({
            text: taskText,
            completed: isCompleted
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCounter() {
    const taskList = document.getElementById('taskList');

    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll('.completed');

    const counterElement = document.getElementById('taskCounter');

    counterElement.textContent =
        `${tasks.length} task(s), ${completedTasks.length} completed`;
}

function clearCompletedTasks() {
    const taskList = document.getElementById('taskList');

    const completedTasks = taskList.querySelectorAll('.completed');

    completedTasks.forEach(task => {
        task.parentElement.remove();
    });

    updateTaskCounter();
    saveTasks();
}