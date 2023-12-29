package com.mwt.abdullah.Repository;


import com.mwt.abdullah.Class.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {

}