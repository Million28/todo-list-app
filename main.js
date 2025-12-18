
document.cookie = "theme-dark; path=/;";

document.addEventListener("DOMContentLoaded", loadtasks)
function loadtasks() {
    const tasks = gettaskFromLocalStorage()
    console.log(tasks);

    tasks.forEach(task => {
        addtasktotheDom(task)
    })

}

const todoform = document.querySelector('#todo-form')
const todoinput = document.querySelector('#todo-input')
const todolist = document.querySelector('#todo-list') 

const toggleButton = document.querySelector("#mode-toggle")

toggleButton.addEventListener("click", switchmode)

function switchmode() {

    document.body.classList.toggle("dark-mode")
    toggleButton.classList.toggle("dark-mode")

    if(document.body.classList.contains("dark-mode")) {

         toggleButton.textContent = " toggle light mode"

         localStorage.setItem("mode", "dark")

    }else{
          toggleButton.textContent = " toggle dark mode"
          localStorage.setItem("mode", "light")
    }
}


// checking  

window.addEventListener("DOMContentLoaded", function() {

    const  saveMode = localStorage.getItem("mode")
   if(saveMode === "dark"){
    document.body.classList.add("dark-mode")
    toggleButton.classList.add("dark-mode")
    toggleButton.textContent = "toggle light mode"

   }else{
      toggleButton.textContent = "toggle dark mode"
   }

})



todoform.addEventListener("submit", addtask)

function addtask(e) {
    e.preventDefault()

    const taskText = todoinput.value.trim()
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        addtasktotheDom(task)
        savetoStorage(task)
        todoinput.value = ""
    }
}

function addtasktotheDom(task) {
    const li = document.createElement('li')
    li.className = `todo-item ${task.completed ? "completed" : ""}`
    li.dataset.id = task.id
    li.innerHTML = `<input type="checkbox" class="todo-check" ${task.completed ? "checked" : "" } >
            <span class="task" >${task.text}</span>
            <button class="edit-btn" >edit</button>
            <button class="delete-btn" >delete</button>`
    todolist.appendChild(li)

    attachmentlistener(li, task)
    attachCheckboxListener(li, task.id)
}
 
function attachCheckboxListener(li, taskid) { 
    const checkbox = li.querySelector(".todo-check")  
    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed", checkbox.checked) 
 
        const tasks = gettaskFromLocalStorage() 
        const task = tasks.find(t => t.id == taskid) 
         if(task) {
            task.completed = checkbox.checked 
            localStorage.setItem("tasks", JSON.stringify(tasks))
         }

    })
}


function attachmentlistener(li, task) {
    const editbtn = li.querySelector('.edit-btn')
    const deletebtn = li.querySelector('.delete-btn')


    editbtn.addEventListener("click", function () {
        handleEdit(task.id, li)
    })
    deletebtn.addEventListener("click", function () {
        handleDelete(task.id, li)
    })
}


function handleDelete(id, li) {
    let tasks = gettaskFromLocalStorage()
    tasks = tasks.filter(task => task.id != id)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    li.remove()
}

function handleEdit(taskid, li) { 
    const taskspan = li.querySelector('.task') 
    console.log(taskspan.textContent); 
    const newtask = prompt('edit your task', taskspan.textContent) 

     if(newtask !== null && newtask.trim() !== "") {
        taskspan.textContent = newtask 

        updateTask(taskid, newtask)

     } 
}


function updateTask(id, newtask) {
     const tasks = gettaskFromLocalStorage()
      const task = tasks.find(task => task.id == id) 
      if(newtask) {
        task.text = newtask 
        localStorage.setItem("tasks", JSON.stringify(tasks))
      }
}




function savetoStorage(task) {
    const oldtasks = gettaskFromLocalStorage()
    oldtasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(oldtasks))

}

function gettaskFromLocalStorage() {
    const oldtasks = JSON.parse(localStorage.getItem("tasks")) || []
    return oldtasks

}