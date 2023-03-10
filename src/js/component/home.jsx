import React, {  useState, useEffect } from "react";

	const URL = 'https://assets.breatheco.de/apis/fake/todos/user/ssaddaada';

[{

}]

const Home = () => {

	const [state, setState] = useState([]);
	const [load, setLoad] = useState(false);

	const getTodoList = async() => {
		try{
			setLoad(true);
			const response = await fetch(URL, { method: "GET" });
			const data = await response.json();
			console.log(data);
			setState(data);
			setLoad(false);
		}catch(err){
				console.log('err')
			}
	}	
	useEffect(async () => {
		getTodoList();
	},[]);

	const addNewTask = async () => {
		try{
			console.log('click')
			const data = [...state, {label : "una task mas", done: false}]
			const res = await fetch(URL, {method: "PUT", body: JSON.stringify(data),headers:{"Content-Type": "application/json"}})
			console.log(res);
			getTodoList();
		}catch(err){
			console.log('ERROR',err)
		}
	}
	return (
		<div className="text-center">
			<h1>Hola</h1>
			{load ? <div>...loading</div> : null}
			{ state.length ? state.map((todo) => <div key={todo.label}> {todo.label}</div>) : 'no data'}
			<button onClick={ addNewTask } >Add new task</button>
		</div>
	);
};

export default Home;
