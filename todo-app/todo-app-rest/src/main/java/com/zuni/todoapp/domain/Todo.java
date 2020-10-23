package com.zuni.todoapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class Todo {
    private Long id;
    private String username;
    private boolean done;
    private String description;
    private LocalDate targetDate;
}
