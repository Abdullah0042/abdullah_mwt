import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTodo() {
    const [todo, setTodo] = useState({
        task: "",
        description: "",
        priority: 0,
    });

    useEffect(() => {
        loadTodo();
    }, []);



    const loadTodo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/todo/${id}`);
            const todoData = response.data;
            console.log(todoData);


            setTodo({
                ...todoData,
                task: todoData.task,
                description: todoData.description,
                priority: todoData.priority
            });
        } catch (error) {
            console.error(error);
        }
    };

    let navigate = useNavigate();

    const {task, description, priority} = todo;
    const [errors, setErrors] = useState({});
    const {id} = useParams();

    const onInputChange = ({target}) => {
        setTodo({...todo, [target.name]: target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!task || !description) {
            setErrors({task: !task, description: !description});
            toast.error("Fill out the fields");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/todo/${id}`, todo);
            console.log(response.data);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Todo</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Task" className="form-label">
                                Task
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.task ? "is-invalid" : ""}`}
                                placeholder="Enter your Task"
                                name="task"
                                value={task}
                                onChange={onInputChange}
                            />
                            {errors.task && (
                                <div className="invalid-feedback">Task is required.</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                                Description
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.description ? "is-invalid" : ""
                                }`}
                                placeholder="Enter your description"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                            />
                            {errors.description && (
                                <div className="invalid-feedback">
                                    Description is required.
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Priority" className="form-label">
                                Priority
                            </label>
                            <select
                                className="form-select"
                                name="priority"
                                value={priority}
                                onChange={onInputChange}
                            >
                                <option value={0}>Select priority</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            {errors.priority && (
                                <div className="invalid-feedback">Priority is required.</div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
