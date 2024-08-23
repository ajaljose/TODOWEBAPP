const addButton = document.getElementById("btn__add");
const parentDiv = document.getElementById("todoList");
const inputTask = document.getElementById("input__task");
let editFlag = false;
let editIndex = "";
addButton.addEventListener("click", function () {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const completeList = JSON.parse(localStorage.getItem("completeList")) || [];
  if (completeList.length == 0)
    localStorage.setItem("completeList", JSON.stringify(completeList));
  if (editFlag) {
    if(todoList[editIndex]==inputTask.value){
        editFlag = false;
    editIndex = "";
    inputTask.value = "";
        return;
    }
    todoList.push(inputTask.value);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    let indOfComplete = completeList.indexOf(editIndex);
    if (indOfComplete > -1) {
      completeList.splice(indOfComplete, 1);
      localStorage.setItem("completeList", JSON.stringify(completeList));
    }
    removeTask(editIndex);
    editFlag = false;
    editIndex = "";
    inputTask.value = "";
  } else {
    const newTask = inputTask.value.trim();

    if (newTask === "") {
      alert("Please enter a task.");
      return;
    }

    const newDiv = document.createElement("div");
    newDiv.className = "list__element";

    const p = document.createElement("p");
    p.className = "cust__scroll";
    p.textContent = newTask;
    newDiv.appendChild(p);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "list__element__actions";
    actionsDiv.innerHTML = `<i class="fa-solid fa-check"onclick="markAsCompleted(${
      todoList.length > 0 ? todoList.length : 0
    },event)"></i><i class="fa-solid fa-pen-to-square" onclick="editTask(${
      todoList.length > 0 ? todoList.length : 0
    })"></i><i class="fa-solid fa-trash"  onclick="removeTask(${
      todoList.length > 0 ? todoList.length : 0
    })"></i>`;
    newDiv.appendChild(actionsDiv);
    newDiv.classList.add("fade-in");
    parentDiv.prepend(newDiv);

    todoList.push(inputTask.value);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    inputTask.value = "";
    setTimeout(function () {
      newDiv.classList.add("active");
    }, 200);
  }
});
function restoreExistingList() {
  const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const completeList = JSON.parse(localStorage.getItem("completeList")) || [];
  todoList.forEach((task, index) => {
    const newDiv = document.createElement("div");
    newDiv.className = completeList.includes(index)
      ? "list__element complete"
      : "list__element";
    newDiv.id = "task_" + index;
    const p = document.createElement("p");
    p.className = "cust__scroll";
    p.textContent = task;
    newDiv.appendChild(p);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = completeList.includes(index)
      ? "list__element__actions complete-light"
      : "list__element__actions";
    actionsDiv.innerHTML = `<i class="fa-solid fa-check" onclick="markAsCompleted(${index},event)"></i><i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i><i class="fa-solid fa-trash"  onclick="removeTask(${index})"></i>`;
    newDiv.appendChild(actionsDiv);
    parentDiv.prepend(newDiv);
  });
}
function removeTask(index) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  const completeList = JSON.parse(localStorage.getItem("completeList")) || [];
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
 
  let indOfComplete = completeList.indexOf(index);
  if (indOfComplete > -1) {
    completeList.splice(indOfComplete, 1);    
}
for(let i=0;i<completeList.length;i++){
    if(completeList[i]>index){
        completeList[i]=completeList[i]-1;
    }
}
localStorage.setItem("completeList", JSON.stringify(completeList));
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
  restoreExistingList();
}
function editTask(index) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  inputTask.value = todoList[index];
  editFlag = true;
  editIndex = index;
}
function taskOnChange() {
  if (inputTask.value == "") {
    editFlag = false;
    editIndex = "";
  }
}
function markAsCompleted(index, event) {
  console.log(event);
  const parentElement = event.target.parentElement;
  parentElement.classList.add("complete-light");
  const grandparentElement = parentElement.parentElement;

  grandparentElement.classList.add("complete");
  const completeList = JSON.parse(localStorage.getItem("completeList")) || [];
  !completeList.includes(index) ? completeList.push(index) : "";
  localStorage.setItem("completeList", JSON.stringify(completeList));
}
