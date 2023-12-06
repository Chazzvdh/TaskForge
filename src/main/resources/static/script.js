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
            editButton.classList.add("button");
            editButton.id = `edit-button-${task.taskId}`;
            editButton.addEventListener("click", () => {
                // Call function to edit task when edit button is clicked
                editTask(task.taskId);
            });
            taskDiv.appendChild(editButton);

            // Create and append delete button with class and id
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("button");
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

// Function to edit a task
function editTask(taskId) {
    const editForm = document.getElementById("editTaskForm");

    // Fetch the task details for the selected task
    fetch(`http://localhost:8080/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            // Populate the edit form with the task details
            document.getElementById("editTitle").value = task.title;
            document.getElementById("editDescription").value = task.description;

            // Format the date to "YYYY-MM-DD"
            const formattedDate = new Date(task.dueDate).toISOString().split('T')[0];
            document.getElementById("editDueDate").value = formattedDate;

            document.getElementById("editStatus").value = task.status;

            // Show the edit form
            editForm.style.display = "block";

            // Add an event listener to handle the form submission
            const editFormSubmitHandler = (event) => {
                event.preventDefault(); // Prevent the default form submission behavior

                // Perform the update using the PUT method
                fetch(`http://localhost:8080/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: document.getElementById("editTitle").value,
                        description: document.getElementById("editDescription").value,
                        dueDate: document.getElementById("editDueDate").value,
                        status: document.getElementById("editStatus").value
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to update task with ID ${taskId}`);
                        }
                        location.reload(); // Reload the page after a successful update
                    })
                    .catch(error => {
                        console.error('Error updating task:', error);
                    })
                    .finally(() => {
                        // Remove the event listener after form submission
                        editForm.removeEventListener("submit", editFormSubmitHandler);
                    });
            };

            editForm.addEventListener("submit", editFormSubmitHandler);

            // Add an event listener to the "Cancel" button
            const cancelButton = document.getElementById("editTaskFormCancel");
            cancelButton.addEventListener("click", () => {
                // Hide the edit form when "Cancel" is clicked
                editForm.style.display = "none";
            });
        })
        .catch(error => {
            console.error('Error fetching task details for editing:', error);
        });
}

// Add an event listener to close the edit form when it is submitted
document.getElementById("editTaskForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    this.style.display = "none"; // Hide the edit form after submission
});

document.addEventListener("DOMContentLoaded", loadSettings);

function loadSettings() {
    const accentColorInput = document.getElementById("accentColor");
    const darkModeInput = document.getElementById("darkMode");

    // Load settings from localStorage or use default values
    accentColorInput.value = localStorage.getItem("accentColor") || "#417081";
    darkModeInput.checked = JSON.parse(localStorage.getItem("darkMode")) || false;

    applySettings();
}

function applySettings() {
    const accentColor = document.getElementById("accentColor").value;
    const darkMode = document.getElementById("darkMode").checked;

    // Update root styles with selected accent color
    document.documentElement.style.setProperty("--accent-color", accentColor);
    // Update other styles based on dark mode setting
    if (darkMode) {
        document.documentElement.style.setProperty("--main-bg-color", "#1e1e1e");
        document.documentElement.style.setProperty("--secondary-bg-color", "#505050");
        document.documentElement.style.setProperty("--text-color", "white");
    } else {
        document.documentElement.style.setProperty("--main-bg-color", "white");
        document.documentElement.style.setProperty("--secondary-bg-color", "#f0f0f0");
        document.documentElement.style.setProperty("--text-color", "#333");
    }

    // Save settings to localStorage
    localStorage.setItem("accentColor", accentColor);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

