package com.zuni.todoapp.controller;

import com.zuni.todoapp.domain.Todo;
import com.zuni.todoapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllUserTodos(@PathVariable String username) {
        return todoService.getAllUserTodos(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getUserTodoById(@PathVariable String username , @PathVariable  Long id) {
        return todoService.findById(username,id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable Long id) {
        Todo todo = todoService.deleteById(username , id);
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable  String username , @PathVariable  Long id, @RequestBody Todo todo) {
        Todo updatedTodo = this.todoService.update(username ,id,todo);
        return new ResponseEntity<Todo>(updatedTodo , HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Void> createTodo(@PathVariable  String username ,  @RequestBody Todo todo) {
        Todo createdTodo = this.todoService.create(username ,todo);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdTodo.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }
}
