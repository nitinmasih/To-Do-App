// Getting DOM elements
const inputElem = document.getElementById('form-input'); // Input field
const btnElem = document.getElementById('form-btn'); // Button
const listElem = document.getElementById('items-list'); // List container
const formElem = document.getElementsByTagName('form1'); // Form
const searchInput = document.getElementById('search-box'); // Search input
const allTodoBtn = document.getElementById('all-todo-btn'); // "All" filter button
const activeTodoBtn = document.getElementById('active-todo-btn'); // "Active" filter button
const completedTodoBtn = document.getElementById('completed-todo-btn'); // "Completed" filter button

// Initializing variables
const todoList = []; // Array to store todos
const ACTIVE_TODO = 'ACTIVE'; // Constant for active todos
const ALL_TODO = 'ALL'; // Constant for all todos
const COMPLETED_TODO = 'COMPLETED'; // Constant for completed todos
const EDIT_BTN_TEXT = 'Edit'; // Text for edit button
const SUBMIT_BTN_TEXT = 'Submit'; // Text for submit button
let editTodoIndex; // Index of todo being edited

// Event listener for input field change
inputElem.addEventListener('change', (e) => {
  inputElem.setAttribute('value', e.target.value);
});

// Function to handle checkbox click
const handleCheckbox = (todoId) => {
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
  const currentTodo = todoList[todoIndex];
  currentTodo.completed = !currentTodo.completed;
  renderTodos(todoList);
};

// Function to delete a todo
const deleteTodo = (todoId) => {
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
  todoList.splice(todoIndex, 1);
  renderTodos(todoList);
};

// Function to edit a todo
const editTodo = (todoId) => {
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
  editTodoIndex = todoIndex;
  inputElem.value = todoList[todoIndex].text;
  btnElem.innerText = EDIT_BTN_TEXT;
};

// Function to render todos
const renderTodos = (todoListArray) => {
  listElem.innerHTML = '';
  todoListArray.forEach((todo) => {
    const liElem = document.createElement("li")
    const checkboxElem = document.createElement("input")
    checkboxElem.type = "checkbox"
    checkboxElem.id = "checkbox"
    checkboxElem.checked = todo.completed;
    const labelElem = document.createElement("label")
    labelElem.setAttribute("for", "checkbox")
    labelElem.innerHTML = todo.text;
    liElem.appendChild(checkboxElem)
    const deleteBtn = document.createElement('span')
    deleteBtn.classList.add("material-symbols-outlined")
    deleteBtn.id = "deleteBtn"
    deleteBtn.style.fontSize = "22px"
    deleteBtn.innerHTML = "delete"
    const editBtn = document.createElement('span')
    editBtn.id = "editBtn"
    editBtn.classList.add("material-symbols-outlined")
    editBtn.style.fontSize = "32px"
    editBtn.style.marginTop = "5px"
    editBtn.innerHTML = "edit_note"

    listElem.appendChild(liElem)
    liElem.appendChild(labelElem)
    liElem.appendChild(editBtn)
    liElem.appendChild(deleteBtn)
    
    checkboxElem.addEventListener('click', () => handleCheckbox(todo.id));
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id))
    editBtn.addEventListener("click", () => editTodo(todo.id))
  });
};

// Event listener for form submission
btnElem.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputElem.value === '') {
    return;
  }
  if (btnElem.innerText === EDIT_BTN_TEXT) {
    todoList[editTodoIndex].text = inputElem.value;
    renderTodos(todoList);
    btnElem.innerText = SUBMIT_BTN_TEXT;
    inputElem.value = '';
  } else {
    todoList.push({
      id: Date.now(),
      text: inputElem.value,
      completed: false,
    });
    renderTodos(todoList);
    inputElem.value = '';
  }
});

// Event listener for search input
searchInput.addEventListener('keyup', () => {
  const searchInputValue = searchInput.value;
  const filterData = [];
  for (let i = 0; i < todoList.length; i++) {
    const currentTodo = todoList[i];
    if (currentTodo.text.includes(searchInputValue)) {
      filterData.push(currentTodo);
    }
  }
  renderTodos(filterData);
});

// Function to filter todos
const filterTodos = (filterType) => {
  if (filterType === ACTIVE_TODO) {
    const filterAllTodos = todoList.filter((todo) => !todo.completed);
    renderTodos(filterAllTodos);
  } else if (filterType === COMPLETED_TODO) {
    const filterAllTodos = todoList.filter((todo) => todo.completed);
    renderTodos(filterAllTodos);
  } else {
    renderTodos(todoList);
  }
};

// Event listeners for filter buttons
allTodoBtn.addEventListener('click', () => filterTodos(ALL_TODO));
activeTodoBtn.addEventListener('click', () => filterTodos(ACTIVE_TODO));
completedTodoBtn.addEventListener('click', () => filterTodos(COMPLETED_TODO));


