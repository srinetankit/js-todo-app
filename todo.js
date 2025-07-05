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


// create todo functionality
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


// Render all todo items on UI
function render(){
    todobody.innerHTML = ''; //clear the todobody before re-render  
    todos.forEach((todo) => {
        let addDiv = document.createElement('div');
        addDiv.classList.add('item');
            addDiv.setAttribute('id', todo.id);
            addDiv.innerHTML =`
            <input type="text" class="todoText" name="${todo.item}" value="${todo.item}" readonly autocapitalize="on">
            <div class="handletodo">
            <input type='checkbox' class='checkbox' onclick="isCompleted(event)"  />
            <i class="fa-solid fa-pencil" onclick="editTodo(event)" id="edit"></i>
            <i class="fa-solid fa-check" onclick="submitEdit(event)"></i>
            <i class="fa-solid fa-trash-can" id="delete" onclick="deleteTodo(event)"></i>
            </div>`;
            
            todobody.appendChild(addDiv);
            console.log('render invoked');
    })
}

render();

// delete todo functionality

function deleteTodo(e){
    let currTodo = e.target.parentElement.parentElement;
    // console.log(currTodo.id);

    todos.forEach(todo => todo.id == currTodo.id ? currTodo.remove() : todo)
    todos = todos.filter(todo => todo.id != currTodo.id);
    setLocalStorage();
}

// Mark as completed todo and change status

function isCompleted(e){
    
    let currTodo = e.target.closest('.item');
    let currTodoText = currTodo.firstElementChild;
    let editBtn = e.target.nextElementSibling;
    console.log(editBtn);
    
    // console.log(currTodo.id);
    todos.forEach(todo => {
        if(todo.id == currTodo.id){
            if (!(todo.status)) {
                currTodoText.classList.add('completed')
                e.target.setAttribute('checked', true);
                editBtn.classList.add('d-none');

            }else{
                currTodoText.classList.remove('completed');
                e.target.removeAttribute('checked');
                editBtn.classList.remove('d-none');
            }
            todo.status = !(todo.status)
            setLocalStorage();
        }
    })
}

 