import React from "react";
import "./toDo.css";
import { useState,useEffect } from "react";
import { getAll, remove, updatePatch,post} from "../../service/functionsHTTP";
import Card from "../card/Card";
import CardCreate from "../cardCreate/CardCreate";
function ToDo() {

    const [toDo, setToDo] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    async function getTodo() {
      try {
        const url = `http://localhost:3000/api/to-do`;
        const res = await getAll(url);
  
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const parsed = await res.json();
        setToDo(parsed);
      } catch (error) {
        console.error(error);
      }
    }

    const handleDelete = async (id) => {
      try {
        const url = `http://localhost:3000/api/to-do/${id}`;
        const res = await remove(url);

        if (!res.ok) {
          throw new Error("Failed to delete task");
        }
        setToDo((prevToDo) => prevToDo.filter(task => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    };
  

    const handleCompleted = async (id) => {
      try {
        const url = `http://localhost:3000/api/to-do/${id}`;
        const body = {
          status: true,
        }
        const res = await updatePatch(url, body);
        if (!res.ok) {
          throw new Error("Failed to delete task");
        }
        setToDo((prevToDo) =>
          prevToDo.map(task =>
            task.id === id
              ? { ...task, status: true }
              : task
          )
        );

      } catch (error) {
        console.error(error);
      }
    };


    const handleAddTask = async (task) => {
      try {
        const url = `http://localhost:3000/api/to-do`;
        const res = await post(url, task);
  
        if (!res.ok) {
          throw new Error("Failed to add task");
        }
        const newTask = await res.json();
        setToDo((prevToDo) => [newTask, ...prevToDo]);
        setShowCreate(false);
      } catch (error) {
        console.error(error);
      }
    };


    useEffect(() => {
        getTodo();
    }, []);

  return (
    <div className="general-container">
    <div className="container-button">

    {showCreate ?
        <button className="btn-cancel-create" onClick={() => setShowCreate(!showCreate)}>
        Cancel
      </button>
      :
      <button onClick={() => setShowCreate(!showCreate)}>
        Add Task
      </button>
  }

    </div>
    <div className="container-tasks">
      {showCreate && <CardCreate onCreate={handleAddTask} />}
      {toDo.map((task,index) => (
        <Card key={index} id={task.id} title={task.title} description={task.description}  status={task.status} onDelete={handleDelete} onCompleted={handleCompleted}></Card>
      ))} 
    </div>
    </div>
  );
}

export default ToDo;