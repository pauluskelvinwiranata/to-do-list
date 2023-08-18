const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addButton");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(index));

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && taskInput.value.trim() !== "") {
    addTask(taskInput.value.trim());
  }
});

addButton.addEventListener("click", () => {
  if (taskInput.value.trim() !== "") {
    addTask(taskInput.value.trim());
  }
});

renderTasks();
