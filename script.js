let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let time = document.querySelector("#timeInput")
let date = document.querySelector("#dateInput")
let text = document.querySelector("#text");

let currentTime;
let notificationDelay = 120000;

if("Notification" in window)
    {Notification.requestPermission().then(perm => {
    if(perm !== "granted"){
        alert("please turn on notification")
        location.reload()
    }
    if(perm === "granted"){
        alert(` We Are Ready To Send You Notification About Your Tasks`)
    }}
)}

let allTimes = [];
let allIntervals = []; // Store interval IDs of all tasks

function scheduleReminder(){
    
    let dateTime = new Date(`${date.value}T${time.value}`);
    let scheduledTime = dateTime;
    currentTime = new Date()
    let timeDifference = scheduledTime - currentTime
    let newElem
    let check = 0

    if(timeDifference>0){
    newElem = document.createElement("ul");
    newElem.innerHTML = `<div id="inputText">${todoInput.value}</div> at
    <div id="declaredTime"> ${time.value}</div>on
    <div id="declaredDate"> ${date.value}</div>
    <div id="trash"><i class="ri-delete-bin-6-fill"></i></div>`;
    let delIcon = newElem.querySelector("#trash"); // Store the reference to delIcon
    text.appendChild(newElem)
    
    function addReminder(todoInput, dateTime) {
        let timeoutId = setTimeout(() => {
          new Notification("Your Task", {
            body: `${todoInput} at ${dateTime} is pending`,
            requiredInteraction: true,
          });
          newElem.style.color = "red";
          let intervalId = setInterval(() => {
            currentTime = new Date(); // Update the currentTime
            if (currentTime >= scheduledTime) {
              new Notification(`pending task`, {
                body: `your ${todoInput} is pending`,
                requiredInteraction: true,
              })
            } else {
              clearInterval(intervalId); // Clear the interval if the scheduled time has not passed
            }
          },notificationDelay)
          allIntervals.push({intervalId, newElem}); // Store interval ID and corresponding task element
        }, timeDifference);

        newElem.addEventListener("click",function(){
          if(check===0){
              newElem.style.textDecoration = "line-through"
              newElem.style.opacity = "0.3"
              allIntervals.forEach((item) => {
                if (item.newElem === newElem) {
                  clearInterval(item.intervalId);
                }
              });
              check =1
          }else{
              newElem.style.textDecoration = "none"
              newElem.style.opacity = "1"
              check =0
          }
      })

    
    delIcon.addEventListener("click", function(){
      if(check===0){
        allIntervals.forEach((item, index) => {
          if (item.newElem === newElem) {
            clearInterval(item.intervalId);
            allIntervals.splice(index, 1);
          }
        });
        newElem.remove();
      }
    });

        
        allTimes.push(timeoutId);
      }
    addReminder(todoInput.value, dateTime);

    }if(timeDifference<=0){
        alert("Your scheduled Time Is In The Past")
    }

}
    

addBtn.addEventListener('click', function(){
    if(todoInput.value ==="" || time.value === ""){
        alert("Please Enter A Task With Time");
    }else{

    scheduleReminder();
    

} 
    
})