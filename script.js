const form=document.querySelector('.form');
const item=document.getElementById('items');
const button=document.getElementById('btn');
const ul=document.getElementById('mainList');
const p=document.getElementById('p');

button.addEventListener('click',function(){
console.log(item.value);
var nElement=document.createElement('div');
nElement.textContent=item.value;
var addBtns=this.parentElement.appendChild(nElement);
addBtns.appendChild()
});
