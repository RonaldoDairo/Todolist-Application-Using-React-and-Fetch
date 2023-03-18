import React, { useState, useEffect } from "react";
const URL = "https://assets.breatheco.de/apis/fake/todos/user/Dai";
export const PrintTa = () => {
    const [state, setState] = useState([]);
    const [load, setLoad] = useState(false);
    const [newTask, setnewTask] = useState("");
    const getData = async () => {
        try {
            setLoad(true);
            const response = await fetch(URL, { method: "GET" });
            const data = await response.json();
            setState(data);
            setLoad(false);
        } catch (err) {
            console.log("err");
        }
    }
    useEffect(() => {
        getData()
    }, []);
    const addNewTask = async () => {
        try {
            setLoad(true);
            const data = [...state, { label: newTask, done: false }]
            const response = await fetch(URL, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
            console.log(response);
            getData();
            state();
            setLoad(false);
        } catch (err) {
            console.log("err");
        }
    };
    const doneTask = async (indice) => {
        try {
            const newState = [...state];
            console.log(state);
            newState[indice].done = true;
            setLoad(true);
            const response = await fetch(URL, { method: "PUT", body: JSON.stringify(newState), headers: { "Content-Type": "application/json" } });
            console.log(response);
            await getData();
            setLoad(false);
        } catch (err) {
            console.log("err");
        }
    };
    const deleteTask = async (indice) => {
        try {
            const newState = state.filter((elem, index) => {
                return indice !== index
            })
            setLoad(true);
            const response = await fetch(URL, { method: "PUT", body: JSON.stringify(newState), headers: { "Content-Type": "application/json" } });
            console.log(response);
            await getData();
            setLoad(false);
        } catch (err) {
            console.log("err");
        }
    };
    return (
        <div className="text-center">
            <div className="input-btn">
            <input className="input" onChange={(e) => {setnewTask(e.target.value)}} type="text" placeholder="write down your task" />
            <button className="btn btn-primary add-button" onClick={addNewTask}>Add New Task</button>
            {load ? <div className="spinner spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
                : state.map((task, index) => {
                    return <div className="card mt-3"><h1 key={task.label}> {task.label} </h1>
                        <button className="btn btn-success" onClick={() => { doneTask(index) }}>Mark as Done</button>
                        <button className="btn btn-danger" onClick={() => { deleteTask(index) }}>Delete Task</button>
                    </div>
                })}
            </div>
        </div>
    );
};