// script.js


let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');

let text = document.querySelector("#text");

addBtn.addEventListener('click', function(){
    if(todoInput.value ==""){
        alert("Please Enter A Task");
    }else{
    let newElem = document.createElement("ul");
    newElem.innerHTML = `<div id="inputText">${todoInput.value}</div><div id="trash"><i class="ri-delete-bin-6-fill"></i></div>`;
    text.appendChild(newElem)
    
   newElem.querySelector("i").addEventListener("click", removeElem);
   function removeElem(){
        newElem.remove();
    }
    todoInput.value = "";
    let textInput = newElem.querySelector("#inputText")
    let check = 0
    textInput.addEventListener("click",function(){
        if(check==0){
        textInput.style.textDecoration = "line-through"
        textInput.style.opacity = "0.3"
        console.log("he")
        check =1
    }else{
        textInput.style.textDecoration = "none"
        textInput.style.opacity = "1"
    }
})
    

    }})





