const addButton = document.getElementById("btn__add");
const parentDiv = document.getElementById("todoList");
const inputTask = document.getElementById("input__task");

addButton.addEventListener("click", function() {
  const newTask = inputTask.value.trim();

  if (newTask === "") {
    alert("Please enter a task.");
    return;
  }

  const newDiv = document.createElement("div");
  newDiv.className = "list__element";

  const p = document.createElement("p");
  p.textContent = newTask;
  newDiv.appendChild(p);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "list__element__actions";
  actionsDiv.innerHTML = '<i class="fa-solid fa-check"></i><i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"></i>';
  newDiv.appendChild(actionsDiv);

  parentDiv.appendChild(newDiv);
  let todoList=JSON.parse(localStorage.getItem("todoList"));
  todoList.push(inputTask.value);
  localStorage.setItem("todoList",JSON.stringify(todoList));
  inputTask.value = "";

});
function restoreExistingList(){
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    todoList.forEach(task => {
      const newDiv = document.createElement("div");
      newDiv.className = "list__element";
  
      const p = document.createElement("p");
      p.textContent = task;
      newDiv.appendChild(p);
  
      const actionsDiv = document.createElement("div");
      actionsDiv.className = "list__element__actions";
      actionsDiv.innerHTML = '<i class="fa-solid fa-check"></i><i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"></i>';
      newDiv.appendChild(actionsDiv);
  
      parentDiv.appendChild(newDiv);
    });
}