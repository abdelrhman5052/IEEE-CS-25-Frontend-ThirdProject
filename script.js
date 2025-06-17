
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let deleteIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `<strong>${task.text}</strong><br><small>${task.time}</small>`;

    const status = document.createElement("select");
    status.className = "status";
    ["none", "in-progress", "completed"].forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.text = opt;
      if (opt === task.status) option.selected = true;
      status.appendChild(option);
    });
    status.onchange = () => {
      task.status = status.value;
      saveTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = () => {
      deleteIndex = index;
      document.getElementById("confirmBox").classList.remove("hidden");
    };

    li.appendChild(info);
    li.appendChild(status);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;
  const now = new Date();
  const time = now.toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
  tasks.push({ text, time, status: "none" });
  input.value = "";
  saveTasks();
  renderTasks();
}

function confirmDelete(confirm) {
  if (confirm && deleteIndex !== null) {
    tasks.splice(deleteIndex, 1);
    saveTasks();
    renderTasks();
  }
  deleteIndex = null;
  document.getElementById("confirmBox").classList.add("hidden");
  
}

window.onload = renderTasks;
