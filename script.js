const formData = document.getElementById("form-data");
const items = document.getElementById("grocery-item"); //grocery
const submit = document.querySelector(".btn"); //submitben
const clearBtn = document.querySelector(".clear-btn");
// const container = document.querySelector('.container');
const list = document.querySelector(".grocery-list");
// const dele=document.querySelector('.del');

let editElement;
let editId = "";
// let editFlag = false; // this is not required now

init();

// initialisation function
function init() {
  invokeApplisteners();

  //TODO: check for previous data in ls
  // call this `getListOnLoad` function and return only list items,remove html code from there
  //TODO: loop through list and render items
  //TODO: renderItem(listItem)
}

//listeners
function invokeApplisteners() {
  formData.addEventListener("submit", addData);
  clearBtn.addEventListener("click", remove);

  window.addEventListener("load", function () {
    getListOnLoad();
  });
}

function renderItem(value, itemId) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  const attribute = document.createAttribute("data-id");
  attribute.value = itemId;
  // console.log("attribute",attribute.value);
  element.setAttributeNode(attribute);
  element.innerHTML = `<p>${value}</p>
                <div class="btn-container">
                <button type="button" id=edit-${itemId}><i class="fa fa-pencil edit fa-lg" aria-hidden="true"></i></button>
                <button type="button" id= delete-${itemId}><i class="fa fa-trash del fa-lg" aria-hidden="true"></i></button>
                </div>
                </div>`;

  list.appendChild(element);

  const dele = document.querySelector("#delete-" + itemId);
  const edit = document.querySelector("#edit-" + itemId);

  edit.addEventListener("click", editItems);
  dele.addEventListener("click", delItems);

  //TODO: attach html to page in list
  //TODO: attach listeners
}

function addData(event) {
  //TODO: remove unneccory code now that we have renderItem function
  //TODO: create separate function for edit item code, as function name suggests it should only have add functionality related code
  event.preventDefault();
  const itemId = createRandomId();
  // console.log(itemId);
  const value = items.value;
  console.log(value);

  const inputEl = document.querySelector("input#grocery-item");
  const editId = inputEl.getAttribute("data-edit-element-id");

  if (editId && value) {
    const editElement = document.querySelector(`article[data-id="${editId}"]`);
    console.log(editElement);
    editElement.firstChild.innerHTML = value;
    editLocalStorage(editId, value);
    submit.textContent = "add";
    inputEl.removeAttribute("data-edit-element-id");
    inputEl.value = "";
    return;
  }

  if (value !== " ") {
    renderItem(value, itemId);
    addToLocalStorage(itemId, value);
  }
  

  setToDefault();
}

function delItems(event) {
  const element = event.currentTarget.parentElement.parentElement;
  console.log(element);
  const deleId = event.currentTarget.id?.replace(element);
  console.log(deleId);
  removeFromLocalStorage(deleId);
  const itemElement = document.getElementById(deleId);
  console.log(itemElement);
  itemElement.remove();
  const id = element.dataset.id;

  element.remove();
  setToDefault();
  // removeFromLocalStorage(id);
}
function editItems(event) {
  submit.textContent = "edit";
  const id = event.currentTarget.id;
  console.log({ id });
  const element = event.currentTarget.parentElement.previousElementSibling;
  console.log(element);
  items.value = element.innerHTML;
 
  console.log("heelo");
  const editId = event.currentTarget.id?.replace("edit-", "");
  console.log({ editId });
  element.id.replace(editId);
  const inputEl = document.querySelector("input#grocery-item");
  inputEl.setAttribute("data-edit-element-id", editId);
  
}
function setToDefault() {
  items.value = " ";

  editId = "";
  submit.textContent = "add";
}
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  //    console.log(grocery);
  let items = getLocalStorage();

  console.log(items);
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function remove() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    // document.classList.remove(".show-btn");

    items.forEach(function (item) {
      list.removeChild(item);
      localStorage.removeItem(item);
    });
  }

  localStorage.removeItem("list");

  setToDefault();
}

function removeFromLocalStorage(deleId) {
  const getDataFromList = getLocalStorage();
  const filter = getDataFromList.filter((item) => item.id == deleId);
  console.log({ filter });
  localStorage.setItem("list", JSON.stringify(filter));
  localStorage.removeItem({ filter });
}
function editLocalStorage(editId, value) {
  const getDataFromList = getLocalStorage();
  const editedList = getDataFromList.map((item) => {
    return {
      ...item,
      value: item.id === editId ? value : item.value,
    };
  });
  localStorage.setItem("list", JSON.stringify(editedList));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function createRandomId() {
  return Math.random().toString(16).slice(2); //to string will convert string into hexadecimal.
}


function getListOnLoad() {
  const dataItems = getLocalStorage();

  console.log(dataItems);
  for (var i = 0; i < dataItems.length; i++) {
    const id = dataItems[i].id;
    renderItem(dataItems[i].value, id);

    
  }
}
