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

// Functions

// Button functionalities
function addItem(event) {
  event.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString(); // little cheat to creat unique ids
  // console.log(id);
  if (value && !editFlag) {
    // console.log("Add item");
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
    // access to DELETE/EDIT button is here, after elemnet has been created
    const deleteButton = element.querySelector('.delete-button');
    const editButton = element.querySelector('.edit-button');
    deleteButton.addEventListener('click', deleteItem);
    editButton.addEventListener('click', editItem);

    // adding item to list
    list.appendChild(element);
    displayAlert('Item Added to List', 'success');
    container.classList.add('show-container');

    //back to default
    setDefault();

    // store to local storage (browse cache)
    addToLocalStorage(id, value);

  } else if (!value && editFlag) {
    // console.log("Edit Item");
  } else {
    console.log("Display Alert");
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
function deleteItem() {
// console.log('item deleted');

};

function editItem() {

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
  displayAlert('List has been Emptied', 'success');
  setDefault();
  // localStorage.removeItem('list');
}
// ------------------------------------------


// *********** Local Storage & Reset **************
function addLocalStorage(id, value) {

}

function setDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitButton.textContent = 'submit';
}
// ------------------------------------------
