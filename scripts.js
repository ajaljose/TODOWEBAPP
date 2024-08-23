const addButton = document.getElementById("btn__add"); //decalred globally because we can reuse in different components
const parentDiv = document.getElementById("todoList");
const inputTask = document.getElementById("input__task");

let editFlag = false; //when a edit button of task is clicked it will be set to true.
let editIndex = ""; // when a edit button of task is clicked it index of the task in todoList will be set in editIndex

addButton.addEventListener("click", function () {
  // add button click listener
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const completeList = JSON.parse(localStorage.getItem("completeList")) || [];
  if (completeList.length == 0)
    localStorage.setItem("completeList", JSON.stringify(completeList));
  if (editFlag) {
    //when edited value is saved it will check if there is any change if no change input box will be set to empty and nothing else will be done
    //if value is edited/updated the new entry will be pushed to todoList array and removes old entry and if it was marked completed it will be reset. 
    if (todoList[editIndex] == inputTask.value) {
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
    // new task will be create and saved into localstorage and ui will be updated
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
    actionsDiv.innerHTML = `<i title="Mark As Completed"class="fa-solid fa-check"onclick="markAsCompleted(${
      todoList.length > 0 ? todoList.length : 0
    },event)"></i><i title="Edit Task"class="fa-solid fa-pen-to-square" onclick="editTask(${
      todoList.length > 0 ? todoList.length : 0
    })"></i><i title="Delete Task"class="fa-solid fa-trash"  onclick="removeTask(${
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


function restoreExistingList() {// this is a function to read the todoList from localStorage and restore the previoulsy saved todo list
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
    actionsDiv.innerHTML = `<i title="Mark As Completed"class="fa-solid fa-check" onclick="markAsCompleted(${index},event)"></i><i title="Edit Task"class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i><i title="Delete Task"class="fa-solid fa-trash"  onclick="removeTask(${index})"></i>`;
    newDiv.appendChild(actionsDiv);
    parentDiv.prepend(newDiv);
  });
}



function removeTask(index) { //to remove a existing task and update ui
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  const completeList = JSON.parse(localStorage.getItem("completeList")) || [];
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  let indOfComplete = completeList.indexOf(index);
  if (indOfComplete > -1) {
    completeList.splice(indOfComplete, 1);
  }
  for (let i = 0; i < completeList.length; i++) {
    if (completeList[i] > index) {
      completeList[i] = completeList[i] - 1;
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
  // this is to handle an edit case. the case is when you click and edit and
  // removes the text from input box if the user removes all character of edit then editflag and editIndex will be reset.
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
