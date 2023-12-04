package com.application.taskforge.application.response;

import com.application.taskforge.domain.Task;
import com.application.taskforge.domain.TaskStatus;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class TaskResponse {
    public Long taskId;
    public String title;
    public String description;
    public String dueDate;
    public String status;

    public TaskResponse(Long taskId, String title, String description, java.util.Date dueDate, TaskStatus status) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;

        // Handle null dueDate
        if (dueDate != null) {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
            this.dueDate = dateFormat.format(dueDate);
        } else {
            this.dueDate = null; // or provide a default string representation if needed
        }

        this.status = status.getStatusString();
    }

    public static TaskResponse fromTask(Task task) {
        return new TaskResponse(task.getTaskId(), task.getTitle(), task.getDescription(), task.getDueDate(), task.getStatus());
    }
}
