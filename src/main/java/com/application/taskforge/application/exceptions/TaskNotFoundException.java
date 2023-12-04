package com.application.taskforge.application.exceptions;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Long id) {
        super("Task with id [%d] does not exist".formatted(id));
    }
}
