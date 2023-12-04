fetch("http://localhost:8080/tasks/all")
    .then(response => response.json())
    .then(data => {
        const tasksContainer = document.getElementById("tasks-container");

        data.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");

            // Create and append title element with class and id
            const titleElement = document.createElement("p");
            titleElement.innerHTML = `<strong>Title:</strong> ${task.title}`;
            titleElement.classList.add("task-title");
            titleElement.id = `task-title-${task.taskId}`;
            taskDiv.appendChild(titleElement);

            // Create and append id element with class
            const idElement = document.createElement("p");
            idElement.innerHTML = `<strong>ID:</strong> ${task.taskId}`;
            idElement.classList.add("task-id");
            taskDiv.appendChild(idElement);

            // Create and append description element with class and id
            const descriptionElement = document.createElement("p");
            descriptionElement.innerHTML = `<strong>Description:</strong> ${task.description}`;
            descriptionElement.classList.add("task-description");
            descriptionElement.id = `task-description-${task.taskId}`;
            taskDiv.appendChild(descriptionElement);

            // Create and append due date element with class and id
            const dueDateElement = document.createElement("p");
            dueDateElement.innerHTML = `<strong>Due Date:</strong> ${task.dueDate}`;
            dueDateElement.classList.add("task-due-date");
            dueDateElement.id = `task-due-date-${task.taskId}`;
            taskDiv.appendChild(dueDateElement);

            // Create and append status element with class and id
            const statusElement = document.createElement("p");
            statusElement.innerHTML = `<strong>Status:</strong> ${task.status}`;
            statusElement.classList.add("task-status");
            statusElement.id = `task-status-${task.taskId}`;
            taskDiv.appendChild(statusElement);

            // Create and append edit button with class and id
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.id = `edit-button-${task.taskId}`;
            editButton.addEventListener("click", () => {
                // Call function to edit task when edit button is clicked
                editTask(task.taskId);
            });
            taskDiv.appendChild(editButton);

            // Create and append delete button with class and id
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.id = `delete-button-${task.taskId}`;
            deleteButton.addEventListener("click", () => {
                // Call function to delete task when delete button is clicked
                deleteTask(task.taskId, taskDiv);
            });
            taskDiv.appendChild(deleteButton);

            tasksContainer.appendChild(taskDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });

function deleteTask(taskId, taskDiv) {
    fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete task with ID ${taskId}`);
            }
            taskDiv.remove(); // Remove the task div from the UI
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
}

function editTask(taskId) {
    // Add your logic to handle editing the task
    console.log(`Editing task with ID ${taskId}`);
    // Redirect or open a modal for editing, etc.
}

document.getElementById("createTaskForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.target;
    const formData = new FormData(form);

    fetch("http://localhost:8080/tasks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            dueDate: formData.get("dueDate"),
            status: formData.get("status")
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create task');
            }
            location.reload(); // Reload the page
        })
        .catch(error => {
            console.error('Error creating task:', error);
        });
});





