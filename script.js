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
    const id = Math.floor(Math.random()*100);
    console.log(id);
    const value = items.value;
    if (value !== " ") {
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const atr = document.createAttribute('data-id');
        atr.value = id;
        element.setAttributeNode(atr);
        element.innerHTML = `<p>${value}</p>
                    <div class="btn-container">
                    <button type="button" id=edit-${id}><i class="fa fa-pencil edit fa-lg" aria-hidden="true"></i></button>
                    <button type="button" id= delete-${id}><i class="fa fa-trash del fa-lg" aria-hidden="true"></i></button>
                    </div>
                    </div>`
                    

                    
                    list.appendChild(element);
                    
                    const edit = document.getElementById(`edit-${id}`);
                    console.log(edit);
                //     const dele = document.querySelector('.edit');

                //    dele.addEventListener('click',delItems);
                   edit.addEventListener('click',(event) => {
                        console.log("event:",event);
                        // editItems(event);
                    });
                    addToLocalStorage(id,value);
                    setToDefault();
            
    }
    else if(value && editFlag){
        editElement.innerHTML=value;
        
        editLocalStorage(editId,value);
        setToDefault();

    }
    

}

function delItems(event){
    const element=event.currentTarget.parentElement.parentElement.parentElement;
    const id=element.dataset.id;

    list.removeChild(element);
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
     
    const id=event.currentTarget.dataset.id;
    console.log(id);
    const element=event.dataset.id;
    console.log(event);

    const editElement=items.value;
    element.textContent=editElement;
    submit.textContent="edit";
    
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