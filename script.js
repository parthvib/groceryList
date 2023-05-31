const form = document.getElementById('formD');
const items = document.getElementById('gItems');//grocery
const submit = document.querySelector('.btn');//submitben
const clearBtn = document.querySelector('.clear-btn');

const container = document.querySelector('.container');
const list = document.querySelector('.grocery-list');
// const dele=document.querySelector('.del');

let editElement;
let editId = "";
editFlag = false;

form.addEventListener('submit', add);
clearBtn.addEventListener('click',remove);



function add(event) {
    event.preventDefault();
    const itemId = createRandomId();
    console.log(itemId);
    const value = items.value;
    if (value !== " ") {
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const atr = document.createAttribute('data-id');
        atr.value = itemId;
        element.setAttributeNode(atr);
        element.innerHTML = `<p>${value}</p>
                    <div class="btn-container">
                    <button type="button" id=edit-${itemId}><i class="fa fa-pencil edit fa-lg" aria-hidden="true"></i></button>
                    <button type="button" id= delete-${itemId}><i class="fa fa-trash del fa-lg" aria-hidden="true"></i></button>
                    </div>
                    </div>`
                    
                    list.appendChild(element);

                    const dele=document.querySelector("#delete-" +itemId);
                    const edit=document.querySelector("#edit-" +itemId);

                    edit.addEventListener("click",editItems);
                    dele.addEventListener("click",delItems);

                    
                  
                    addToLocalStorage(itemId,value);
                    setToDefault();
            
    }
    else if(value && editFlag){
        editElement.innerHTML=value;
        
        editLocalStorage(editId,value);
        setToDefault();

    }
    

}

function delItems(event){
    const element=event.currentTarget.parentElement.previousElementSibling;
    console.log(element);
    // const id=element.dataset.id;

    element.remove();
    setToDefault();
    // removeFromLocalStorage(id);
}
function editItems(event){
    // const element=event.currentTarget.parentElement.parentElement.parentElement;
    //  editElement=event.currentTarget.parentElement.parentElement.previousElementSibling;
    
    // items.value=element.textContent;
    //  editFlag=true;
    //  editId=element.dataset.id;
    //  submit.textContent="edit";
     
    const id=event.currentTarget.id;
    console.log({id});
    const element=event.currentTarget.parentElement.previousElementSibling;
    console.log(element);

    // let pElement=items.value;

    items.value=element.textContent;
    console.log(items.value);

    const editElement=items.value;
    console.log("editElements",editElement);
    
    element.textContent=editElement;
    console.log(element.textContent);
    element.parentElement.remove();

    
    submit.textContent="edit";
   
    const newElement=items.value;
    let newId=newElement.id;
    element.textContent=newElement.textContent;
    // document.id.remove(id);

   element.textContent=newElement.textContent;

  


    


    
    //  setToDefault();

    

}
function setToDefault(){
    items.value="";
    editFlag=false;
    editId='';
    submit.textContent="add";
}
function addToLocalStorage(id,value){
   const grocery={id,value};
//    console.log(grocery);
let items=getLocalStorage();

console.log(items);
items.push(grocery);
localStorage.setItem("list",JSON.stringify(items));

}
function remove(){
    const items=document.querySelectorAll(".grocery-item");
    if(items.length>0){
        // document.classList.remove(".show-btn");

        items.forEach(function(item){
            list.removeChild(item);
            
        }); 
    }
   else {
        // document.classList.add(".show-btn");

    }
    // container.classList.remove(container);
    alert("list cleared");
    localStorage.removeItem('list');
   
        // document.classList.add(".show-btn");
    
    setToDefault();
}

function removeFromLocalStorage(id){

}
function editLocalStorage(id,value){

}
function getLocalStorage(){
     return localStorage.getItem("list")
     ? JSON.parse(localStorage.getItem("list"))
     :[];

}

function createRandomId(){
    return Math.random().toString(16).slice(2);//to string will convert string into hexadecimal.

}