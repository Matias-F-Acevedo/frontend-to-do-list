import "./CardCreate.css";
import React from "react";
import { useState } from "react";




function CardCreate({ onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            title,
            description,
            status
        }
        await onCreate(body)
        alert("Task created successfully")
        setTitle('');
        setDescription('');
        setStatus(false);
    };


    return (
        <div className="card cardCreate">
            <div className="container-h2-create">
                <h2 className="li-title">Create Task</h2>
            </div>

            <form onSubmit={handleSubmit}>

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div>
                    <label htmlFor="completed">Completed:</label>
                    <input
                        type="checkbox"
                        id="completed"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                </div>

                <div className="container-btn-create">
                    <button type="submit">Add Task</button>
                </div>

            </form>
        </div>

    );
}

export default CardCreate;