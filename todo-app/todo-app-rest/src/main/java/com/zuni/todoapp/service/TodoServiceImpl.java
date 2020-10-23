package com.zuni.todoapp.service;

import com.zuni.todoapp.domain.Todo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoServiceImpl implements  TodoService {
    static List<Todo> todos = new ArrayList<>();
    private static final AtomicLong idCounter = new AtomicLong(0);
    static {
        todos.add( new Todo(idCounter.incrementAndGet() ,"zuned" , false, "Learn Angular" , LocalDate.now()) );
        todos.add( new Todo(idCounter.incrementAndGet() ,"zuned" , false ,"Learn React" , LocalDate.now()) );
        todos.add( new Todo(idCounter.incrementAndGet() ,"zuned" , false, "Learn SpringBoot" , LocalDate.now()) );
        todos.add( new Todo(idCounter.incrementAndGet(),"zuned" , false,"Learn Hibernate" , LocalDate.now()) );
        todos.add( new Todo(idCounter.incrementAndGet() ,"zuned" , false , "Learn Junit" , LocalDate.now()) );
    }
    @Override
    public List<Todo> getAllUserTodos(String username) {
        return todos;
    }

    @Override
    public Todo deleteById(String username , Long id) {
        Todo todo = findById(username , id);
        if(todo!=null && todos.remove(todo)) return todo;
        return null;
    }

    @Override
    public Todo create(String username, Todo todo) {
        Todo todoFromDB = null;
        if( todo.getId() != null){
            todoFromDB = findById(username,todo.getId());
        }
        if(todoFromDB == null){
            todo.setId(idCounter.incrementAndGet());
            todos.add(todo);
            return todo;
        }
        return null;
    }

    @Override
    public Todo update(String username, Long id, Todo todo) {
        Todo todoFromDB = findById(username,id);
        if(todoFromDB != null)
        {
            todoFromDB.setTargetDate(todo.getTargetDate());
            todoFromDB.setDescription(todo.getDescription());
            return todoFromDB;
        }
        return null;
    }

    @Override
    public Todo findById(String username , Long id) {
        return todos.stream().filter(todo-> todo.getUsername().equalsIgnoreCase(username)&&todo.getId().equals(id) ).findFirst().orElse(null);
    }


}
