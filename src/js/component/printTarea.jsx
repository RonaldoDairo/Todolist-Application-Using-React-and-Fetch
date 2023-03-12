import React,{useState,useEffect} from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/Dai";
	const HEADER = {"Content-Type": "application/json"};
export const Send = () => {

	const [state, setState] = useState([]);
	const [load, setLoad] = useState(false);
	const [aggTask, setaggTask] = useState("");

	const getTodoList = async() => {
		try{
			const response = await fetch(URL, { method: "GET" });
			const data = await response.json();
			console.log("esto es la data de getTOdoList",data);
			setState(data);
			setLoad(false);
		}catch(err){
				console.log('err')
			}
	}	
	useEffect (()  => {
			getTodoList();
	},[]);

	const addNewTask = async () => {
		try{
			const data = [...state,{label : aggTask , done : false}]
			const res = await fetch(URL, {method: "PUT", body: JSON.stringify(data),
			headers:{"Content-Type": "application/json"}})
			console.log(res);
			getTodoList();
		}catch(err){
			console.log("err")
		}
	}
	const deleteTask = async ()=>{
		try{
			const stat = state.filter((elem,index)=>{
					
					return index
			});
			const res = await fetch(URL, {method: "PUT", body: JSON.stringify(stat),
			headers: HEADER})
			console.log(res);
			getTodoList();
			setLoad(true)
		}catch(err){
			console.log("err")
		}	
		}
		const Check = async ()=>{
			try{
				const check = [...state, { done : true}?{ done : false}: null]
				console.log(check)
				//check[indice].done = true;
				setLoad[true];
				console.log("este es el check",check);
				const res = await fetch(URL, {method: "PUT", body: JSON.stringify(check),
				headers: HEADER})
				console.log(res);
				getTodoList();
			}catch(err){
				console.log("err")
			}
		}
	function BTN(e) {
        setaggTask(e.target.value)
    }
	return (
		<>
			{load ? <div class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			</div> : null}
			<input type="text"
			onChange={BTN} 
			placeholder="What you needs to be done?"
			/>
			{ state ?
			 state.map((todo,index) => <div key={todo.label}> {todo.label}
			 <button onClick={()=>{deleteTask(index)}}>X</button>
			 </div>)
			: setState}
			<button onClick={ addNewTask } >Add new task</button><br />
			<button onClick={ Check } >estado</button>
		</>
	);
};