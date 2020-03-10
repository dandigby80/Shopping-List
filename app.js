// Define UI Vars
const form = document.querySelector('#item-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#item');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove list item event
  taskList.addEventListener('click', removeListItem);
  // Remove all tasks
  clearBtn.addEventListener('click', clearTasks)
  //filter items
  filter.addEventListener('keyup', filterTasks);
}

//Get task from local storage
function getTasks(){
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item list-group-item d-flex justify-content-between align-items-center';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item list-group-item d-flex justify-content-between align-items-center';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();

}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove List item

function removeListItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    //  remove from ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
}

//remove from ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all lists items
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from ls
  clearTasksFromLocalStorage();
}

//clear tasks from ls
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter items

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    console.log(task);
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  });
}


