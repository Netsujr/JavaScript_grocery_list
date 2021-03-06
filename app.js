const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const submitButton = document.querySelector('.submit-button');
const clearButton = document.querySelector('.clear-button');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const grocery = document.getElementById('grocery');

// Variables
let editElement;
let editFlag = false;
let editID = "";
// -------

form.addEventListener('submit', addItem);
clearButton.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);

// Functions

// Button functionalities
function addItem(event) {
  event.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString(); // little cheat to creat unique ids
  // console.log(id);
  if (value && !editFlag) {
    // console.log("Add item");
    createListItem(id, value);
    displayAlert('Item Added to List', 'success');
    container.classList.add('show-container');
    setDefault();
    addToLocalStorage(id, value);

  } else if (value && editFlag) {
    // console.log("Edit Item");
    editElement.innerHTML = value;
    displayAlert('grocery changed!', 'success');
    editLocalStorage(editID, value);
    setDefault();
  } else {
    // console.log("Display Alert");
    displayAlert('No groceries Entered', 'danger');
  }
}

// ***********FUNCTIONS BELOW HERE ***************

// ***********Displaying alerts**************
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
    // alert.style.visibility = 'hidden';
  }, 1500);
}
// ---------------------------------------------------

// ***********Delete + Edit functions**************
function deleteItem(event) {
  // console.log('item deleted');
  const element = event.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('Item removed', 'danger');
  setDefault();
  removeFromLocalStorage(id);
};

function editItem(event) {
  const element = event.currentTarget.parentElement.parentElement;
  editElement = event.currentTarget.parentElement.previousElementSibling;
  // console.log(editElement);
  grocery.value = editElement.innerHTML;
  // console.log(grocery.value);
  editFlag = true;
  editID = element.dataset.id;

  submitButton.textContent = 'edit';
};
// ---------------------------------------------------

// *********** Clear all items on list ***********
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('List Empty', 'success');
  setDefault();
  localStorage.removeItem('list');
}
// ------------------------------------------


// *********** Local Storage & Reset **************
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  // console.log(grocery);
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
  // console.log(items);
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function setDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitButton.textContent = 'submit';
}

// ------------------------------------------

function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
  // console.log(items);
}

function createListItem(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item'); // adding a class
  let attribute = document.createAttribute('data-id'); // adding id
  attribute.value = id;
  element.setAttributeNode(attribute);
  element.innerHTML = `
  <p class="title">${value}</p>
  <div class="btn-container">
  <button type="button" class="edit-button">
  <i class="fas fa-edit"></i>
  </button>
  <button type="button" class="delete-button">
  <i class="fas fa-trash"></i>
  </button>
  </div>
  `;
  // access to DELETE/EDIT button MUST be after elemnet has been created
  const deleteButton = element.querySelector('.delete-button');
  const editButton = element.querySelector('.edit-button');
  deleteButton.addEventListener('click', deleteItem);
  editButton.addEventListener('click', editItem);
  // adding item to list
  list.appendChild(element);
}
