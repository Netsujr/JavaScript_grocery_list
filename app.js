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
function addItem(event) {
  event.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString(); // little cheat to creat unique ids
  // console.log(id);
  if(value && editFlag === false) {
    console.log("Add item");
  } else if(!value && editFlag === true) {
    console.log("Edit Item");
  } else {
    console.log("Nothing to see here");
  }
}
// ------------
