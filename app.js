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
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove list item event
  taskList.addEventListener('click', removeListItem);
  // Remove all tasks
  clearBtn.addEventListener('click', clearTasks)
  //filter items
  filter.addEventListener('keyup', filterTasks);
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

  // Clear input
  taskInput.value = '';

  e.preventDefault();

}

//Remove List item

function removeListItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
  }
}
}

//clear all lists items
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
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


