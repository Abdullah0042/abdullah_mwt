import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewTodo = () => {
    const [todo, setTodo] = useState({
        task: "",
        description: "",
        priority: 0,
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const { task, description, priority } = todo;

    const onInputChange = ({ target }) => {
        setTodo({ ...todo, [target.name]: target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!task || !description) {
            setErrors({ task: !task, description: !description });
            toast.error("Fill out the fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/todo", todo);
            console.log(response.data);
            toast.success("Todo created successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Create New Todo</h2>

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
};

export default NewTodo;
