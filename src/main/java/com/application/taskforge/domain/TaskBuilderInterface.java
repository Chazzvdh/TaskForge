package com.application.taskforge.domain;

import java.sql.Date;

public interface TaskBuilderInterface {
    TaskBuilderInterface setTitle(String title);
    TaskBuilderInterface setDescription(String description);
    TaskBuilderInterface setDueDate(Date dueDate);
    TaskBuilderInterface setStatus(String status);
    Task build();
}
