package com.application.taskforge.domain;

public enum TaskStatus {
    TODO,
    IN_PROGRESS,
    TESTING,
    COMPLETED;
    public String getStatusString() {
        return this.toString();
    }
}

