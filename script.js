
let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let time = document.querySelector("#timeInput")
let text = document.querySelector("#text");

addBtn.addEventListener('click', function(){
    if(todoInput.value ==""){
        alert("Please Enter A Task With Time");
    }else{
    let newElem = document.createElement("ul");
    newElem.innerHTML = `<div id="inputText">${todoInput.value}</div> at 
    <div id="declaredTime">${time.value}</div>
    <div id="trash"><i class="ri-delete-bin-6-fill"></i></div>`;
    text.appendChild(newElem)
    
   newElem.querySelector("i").addEventListener("click", removeElem);
   function removeElem(){
        newElem.remove();
    }
    
    let textInput = newElem.querySelector("#inputText")
    let timeDeclared = newElem.querySelector("#declaredTime")
    let check = 0

    textInput.addEventListener("click",function(){
        if(check==0){
            console.log(textInput.value)
        textInput.style.textDecoration = "line-through"
        textInput.style.opacity = "0.3"
        timeDeclared.style.textDecoration = "line-through"
        timeDeclared.style.opacity = "0.3"
        check =1
    }else{
        textInput.style.textDecoration = "none"
        textInput.style.opacity = "1"
        timeDeclared.style.textDecoration = "none"
        timeDeclared.style.opacity = "1"
        check =0
    }
})

    timeDeclared.addEventListener("click",function(){
        if(check==0){
        timeDeclared.style.textDecoration = "line-through"
        timeDeclared.style.opacity = "0.3"
        textInput.style.textDecoration = "line-through"
        textInput.style.opacity = "0.3"
        check =1
    }else{
        timeDeclared.style.textDecoration = "none"
        timeDeclared.style.opacity = "1"
        textInput.style.textDecoration = "none"
        textInput.style.opacity = "1"
        check =0
    }
})

    Notification.requestPermission().then(perm => {
        if(perm === "granted"){
            new Notification(` at ${time.value} ${todoInput.value} pending`)
            todoInput.value = "";
        }
    })
    

    }})





