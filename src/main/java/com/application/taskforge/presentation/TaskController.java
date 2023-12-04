package com.application.taskforge.presentation;

import com.application.taskforge.application.TaskService;
import com.application.taskforge.application.exceptions.TaskNotFoundException;
import com.application.taskforge.application.response.TaskResponse;
import com.application.taskforge.domain.Task;
import com.application.taskforge.presentation.request.TaskRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public List<TaskResponse> getAllTasks() {
        List<TaskResponse> tasks = new ArrayList<>();
        for (Task task : taskService.findAll()) {
            tasks.add(TaskResponse.fromTask(task));
        }
        return tasks;
    }

    @GetMapping("/{id}")
    public TaskResponse getTaskById(@PathVariable Long id) {
        try {
            return TaskResponse.fromTask(taskService.findById(id));
        } catch (TaskNotFoundException taskNotFoundException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, taskNotFoundException.getMessage());
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public TaskResponse createTask(@RequestBody TaskRequest taskRequest) {
        try {
            return TaskResponse.fromTask(taskService.createTask(taskRequest));
        } catch (TaskNotFoundException taskNotFoundException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, taskNotFoundException.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
        } catch (TaskNotFoundException taskNotFoundException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, taskNotFoundException.getMessage());
        }
    }
}
