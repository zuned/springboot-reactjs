package com.zuni.todoapp.service;

import com.zuni.todoapp.domain.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getAllUserTodos(String username);
    Todo deleteById(String username , Long id);
    Todo update(String username, Long id, Todo todo);
    Todo create(String username, Todo todo);

    Todo findById(String username, Long id);
}
