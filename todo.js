let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Add Task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        text: text,
        completed: false,
        time: new Date().toLocaleString()
    };

    tasks.push(newTask);
    saveAndRender();

    taskInput.value = "";
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
                <div class="task-time">${task.time}</div>
            </div>
            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Toggle Task
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Filter
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

// Save + Render
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Initial Load
renderTasks();
