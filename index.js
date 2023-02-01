//selectors
const todoInput = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')
const todoButton = document.querySelector('.todo-button')
const filterOption = document.querySelector('.filter-todo')

//event liseners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event) {
    event.preventDefault()

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    // console.log(todoInput.value)
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    saveLocalTodos(todoInput.value)

    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')
    todoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)

    todoInput.value = ''
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    // console.log(e.target.value)
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function saveLocalTodos(todo) {
    var todos
    console.log(localStorage.getItem('todos'))
  
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        console.log(todos)
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        console.log(todos)
    }   
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
    
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        console.log(todoInput.value)
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
    
        const completeButton = document.createElement('button')
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn')
        todoDiv.appendChild(completeButton)
    
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
    
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }   
    // const todoo = todo.children[0].innerText
    // localStorage.removeItem('todos', todoo)
    const todoIndex = todo.children[0].innerText
    console.log(todos.indexOf(todoIndex))
    todos.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}