package com.application.taskforge.application;

import com.application.taskforge.application.exceptions.TaskNotFoundException;
import com.application.taskforge.data.TaskRepository;
import com.application.taskforge.domain.Task;
import com.application.taskforge.domain.TaskBuilder;
import com.application.taskforge.presentation.request.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskBuilder taskBuilder;

    @Autowired
    public TaskService(TaskRepository taskRepository, TaskBuilder taskBuilder) {
        this.taskRepository = taskRepository;
        this.taskBuilder = taskBuilder;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task findById(Long id) {
        return this.taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task createTask(TaskRequest taskRequest) {
        Task task = taskBuilder
                .setTitle(taskRequest.title)
                .setDescription(taskRequest.description)
                .setDueDate(taskRequest.dueDate)
                .setStatus(taskRequest.status)
                .build();

        saveTask(task);
        return task;
    }

    public void saveTask(Task task) {
        taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
