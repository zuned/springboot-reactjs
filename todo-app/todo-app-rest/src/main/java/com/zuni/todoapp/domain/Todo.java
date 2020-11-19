package com.zuni.todoapp.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Todo {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private boolean done;
    private String description;
    private LocalDate targetDate;
}
