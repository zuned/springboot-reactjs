package com.zuni.todoapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class Todo {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private boolean done;
    private String description;
    private LocalDate targetDate;
}
