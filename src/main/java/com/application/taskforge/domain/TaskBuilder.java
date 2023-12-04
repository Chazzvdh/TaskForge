package com.application.taskforge.domain;

import org.springframework.stereotype.Component;

import java.sql.Date;

@Component
public class TaskBuilder implements TaskBuilderInterface {
    private String title;
    private String description;
    private Date dueDate;
    private String status;

    public TaskBuilderInterface setTitle(String title) {
        this.title = title;
        return this;
    }

    public TaskBuilderInterface setDescription(String description) {
        this.description = description;
        return this;
    }

    public TaskBuilderInterface setDueDate(Date dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public TaskBuilderInterface setStatus(String status) {
        this.status = status;
        return this;
    }

    public Task build() {
        return new Task(title, description, dueDate, status);
    }
}
