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

const successMessage = (msg) => {
    message.innerHTML = `<span class="success-message">${msg}
                <span id="clearmessage">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </span>`
            setTimeout(() => {message.innerHTML = ''}, 3000);
}

const errorMessage = (msg) => {
    message.innerHTML = `<span class="error-message">${msg}
                <span id="clearmessage">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </span>`
            setTimeout(() => {message.innerHTML = ''}, 3000);
}

