let todobody = document.querySelector(".todo-body")
let addTodo = document.querySelector('.addbtn-div');
const form = document.querySelector('.create-todo');
const message = document.getElementById("message");
const delAll = document.getElementById("delete-all");

let getTodos = localStorage.getItem('key');
let todos = JSON.parse(getTodos); 
if(!todos){
    todos = [];
}

let setLocalStorage = () => {
    localStorage.setItem('key', JSON.stringify(todos));
}

