// TodoList.js
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Fetch todos from your Spring Boot backend
        axios.get('http://localhost:8080/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const handleDelete = (id) => {
        // Delete todo by ID
        axios.delete(`http://localhost:8080/todo/${id}`)
            .then(response => {
                console.log(response.data);
                // Remove the deleted todo from the state
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.task}</td>
                        <td>{todo.description}</td>
                        <td>{todo.priority}</td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(todo.id)}
                            >
                                Delete
                            </button>
                            <Link
                                className="btn btn-outline-primary mx-2" to={`/edittodo/${todo.id}`}
                                >
                                edit
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link className="btn btn-primary" to={`/addtodo`}
                  >Add new ToDo
            </Link>

        </div>
    );
};

export default TodoList;
