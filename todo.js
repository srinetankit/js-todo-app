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

delAll.addEventListener('click', () => {
    const del = confirm('Are you sure want to delete all?');
    if(del){
        localStorage.clear();
        todobody.innerHTML = '';
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let addTodoInput = document.getElementById('addTodoText');
    let addTodoInputValue = addTodoInput.value;
    
    if(addTodoInputValue.trim().length === 0 || addTodoInputValue === undefined || addTodoInputValue === null){
        addTodoInput.focus();
        errorMessage("Invalid Input")
    }else{
        // check item exists or not
        let isExist = false;
        todos.forEach((ele) => {
            if(ele.item === addTodoInputValue){
                isExist = true;     
            }
        });

        if(isExist){
            errorMessage('Todo already exists')
            addTodoInput.focus();
            return;
        }

        const todoObj = {
            item : addTodoInputValue,
            id : Date.now(),
            status : false
        }

        if(!todos){
            todos = [];
        }


        todos = [...todos, todoObj]
        setLocalStorage();
        render();
        addTodoInput.value = '';
        successMessage("Todo Added Successfully");
    }
})

