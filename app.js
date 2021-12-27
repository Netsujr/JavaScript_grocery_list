const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const submitButton = document.querySelector('.submitButton');
const clearButton = document.querySelector('.clearButton');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const grocery = document.getElementById('grocery');

// Variables
let editElement;
let editFlag = false;
let editID = "";
// -------

form.addEventListener('submit', addItem);


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
      // adding  to list
      list.appendChild(element);
      displayAlert('Item Added to List', 'success');
      container.classList.add('show-container');


  } else if (!value && editFlag) {
    // console.log("Edit Item");
  } else {
    console.log("Display Alert");
    // alert.textContent = 'No Groceries Entered';
    // alert.classList.add('alert-danger');
    displayAlert('No groceries Entered', 'danger');
  }
}

// Displaying alerts
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
    // alert.style.visibility = 'hidden';
  }, 1500);
}
// ------------
