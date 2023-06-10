const formData = document.getElementById('form-data');
const items = document.getElementById('grocery-item');//grocery
const submit = document.querySelector('.btn');//submitben
const clearBtn = document.querySelector('.clear-btn');
// const container = document.querySelector('.container');
const list = document.querySelector('.grocery-list');
// const dele=document.querySelector('.del');

let editElement;
let editId = "";
let editFlag = false;

init();



// initialisation function
function init(){

    invokeApplisteners();

    //TODO: check for previous data in ls 
    // call this `getListOnLoad` function and return only list items,remove html code from there
    //TODO: loop through list and render items 
    //TODO: renderItem(listItem)
}

//listeners 
function invokeApplisteners(){
formData.addEventListener('submit',addData);
clearBtn.addEventListener('click',remove);

window.addEventListener('load',function(){
        getListOnLoad();
});
}

function renderItem(value,itemId){
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attribute = document.createAttribute('data-id');
    attribute.value = itemId;
    // console.log("attribute",attribute.value);
    element.setAttributeNode(attribute);
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

                // addToLocalStorage(itemId,value);

//TODO: attach html to page in list 
//TODO: attach listeners

}


function addData(event) {
    //TODO: remove unneccory code now that we have renderItem function
    //TODO: create seprate function for edit item code, as function name suggestes it should only have add functionality related code
    event.preventDefault();
    const itemId = createRandomId();
    // console.log(itemId);
    const value = items.value;
    console.log(value);
   if(value!==" "){
      renderItem(value,itemId);  

   }
        // const element = document.createElement('article');
        // element.classList.add('grocery-item');
        // const attribute = document.createAttribute('data-id');
        // attribute.value = itemId;
        // // console.log("attribute",attribute.value);
        // element.setAttributeNode(attribute);
        // element.innerHTML = `<p>${value}</p>
        //             <div class="btn-container">
        //             <button type="button" id=edit-${itemId}><i class="fa fa-pencil edit fa-lg" aria-hidden="true"></i></button>
        //             <button type="button" id= delete-${itemId}><i class="fa fa-trash del fa-lg" aria-hidden="true"></i></button>
        //             </div>
        //             </div>`
                 
        //             list.appendChild(element);

        //             const dele=document.querySelector("#delete-" +itemId);
        //             const edit=document.querySelector("#edit-" +itemId);

        //             edit.addDataEventListener("click",editItems);
        //             dele.addDataEventListener("click",delItems);

                    
                  
                    // addDataToLocalStorage(itemId,value);
                    // sorting();
                    
                    // }
                    else if(value && editFlag){
                        editElement.innerHTML=value;
                        
                        editLocalStorage(editId,value);
                        
                        
                    }
                    setToDefault();
    

}

function delItems(event){
    const element=event.currentTarget.parentElement.parentElement;
    console.log(element);
    const deleId=event.currentTarget.id?.replace(element);
    console.log(deleId);
    removeFromLocalStorage(deleId);
    const itemElement=document.getElementById(deleId);
    console.log(itemElement);
    itemElement.remove();
    const id=element.dataset.id;

    element.remove();
    setToDefault();
    // removeFromLocalStorage(id);
}
function editItems(event){
    editFlag='true';
    submit.textContent="edit";
    const id=event.currentTarget.id;
    console.log({id});
    const element=event.currentTarget.parentElement.previousElementSibling;
    console.log(element);
    items.value=element.innerHTML;
    // element.parentElement.remove();
    //  if(clearBtn.textContent=="edit",addEventListener('click',)){
         console.log("heelo");
     const editId=event.currentTarget.id?.replace(element);
     element.id.replace(editId);
     
        //  console.log("editId",editId);
        //  const newValue=items.value;
        //  console.log(newValue);
        // element.parentElement.remove();
    //  }
     
    // // items.value=element.textContent;
   
    // // let pElement=items.value;
    
    
    // element.innerHTML=items.value;
    // const editElement=items.value;
    // console.log("editElements",editElement);
    
    // element.textContent=editElement;
    // element.value=editElement;
    // console.log(element.textContent);
    // // element.parentElement.remove();
   

    
    // submit.textContent="edit";
   
    // const newElement=items.value;
    // let newId =newElement.id;
    // element.textContent=newElement.textContent;
    // // document.id.remove(id);
    
    // element.textContent=newElement.textContent;
    // editLocalStorage(editId,newElement);
    // console.log("newId",newId);

    // //  setToDefault();

}
function setToDefault(){
    items.value=" ";
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
            localStorage.removeItem(item);
        }); 
    }
 
    
    localStorage.removeItem('list');
   
   

    
    setToDefault();
}

function removeFromLocalStorage(deleId){
const getDataFromList=getLocalStorage();
const filter=getDataFromList.filter((item)=>item.id==deleId);
console.log({filter});
localStorage.setItem("list",JSON.stringify(filter));
localStorage.removeItem({filter});
}
function editLocalStorage(editId){
    const getDataFromList=getLocalStorage();
    const filter=getDataFromList.filter((item)=>item.id==editId);
    console.log({filter});
    localStorage.setItem("list",JSON.stringify(filter));
}
function getLocalStorage(){
     return localStorage.getItem("list")
     ? JSON.parse(localStorage.getItem("list"))
     :[];

}

function createRandomId(){
    return Math.random().toString(16).slice(2);//to string will convert string into hexadecimal.

}
// function getListOnLoad(){
// const dataItems=getLocalStorage();
// for(var i=0;i < dataItems.length;i++){
//     list.innerHTML=document.classList.addData('grocery-list');

// }
// }

function getListOnLoad(){
    const dataItems=getLocalStorage();
    
    console.log(dataItems);
    for(var i=0;i<dataItems.length;i++){
        const id=dataItems[i].id;
        renderItem(dataItems[i].value,id);

    // const element = document.createElement('article');
    //     element.classList.addData('grocery-item');
    //     const attribute = document.createAttribute('data-id');
    //     const itemId=dataItems[i].id;
    //     attribute.value = itemId;
    //     element.setAttributeNode(attribute);
    //     element.innerHTML = `<p>${dataItems[i].value}</p>
    //                 <div class="btn-container">
    //                 <button type="button" id=edit-${itemId}><i class="fa fa-pencil edit fa-lg" aria-hidden="true"></i></button>
    //                 <button type="button" id= delete-${itemId}><i class="fa fa-trash del fa-lg" aria-hidden="true"></i></button>
    //                 </div>
    //                 </div>`
                    
    //                 list.appendChild(element);

    //                 const dele=document.querySelector("#delete-" +itemId);
    //                 const edit=document.querySelector("#edit-" +itemId);

    //                 edit.addDataEventListener("click",editItems);
    //                 dele.addDataEventListener("click",delItems);


                    
    }    
                 


  
    
}
