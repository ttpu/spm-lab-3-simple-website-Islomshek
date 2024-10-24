document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const task = taskInput.value.trim();
        if (task) {
            fetch('/add_task', {
                method: 'POST',
                body: new URLSearchParams({ 'task': task }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(data => {
                taskInput.value = '';
                renderTasks(data.tasks);
            });
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-task')) {
            const taskId = e.target.getAttribute('data-id');
            fetch(`/delete_task/${taskId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                renderTasks(data.tasks);
            });
        }
    });

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            taskList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${task}
                    <button class="btn btn-danger btn-sm delete-task" data-id="${index}">Delete</button>
                </li>`;
        });
    }
});
