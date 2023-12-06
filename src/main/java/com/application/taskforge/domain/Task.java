package com.application.taskforge.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @Column
    private Date dueDate;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    public Task(String title, String description, Date dueDate, String status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = TaskStatus.valueOf(status);
    }

    public Task() {

    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long id) {
        this.taskId = id;
    }
}
