import { getUsers, getData } from "./data.js";
import { getTime } from "./clock.js";
import { renderContainer } from "./dom.js";
import { addOrEditTodo, deleteAll } from "./handlers.js";

//getUsers();

const clock = document.querySelector(".header-clock");
clock.textContent = getTime();
setInterval(() => {
    clock.textContent = getTime();
}, 60000);

const tasks = getData("tasks");

const btnAddTodo = document.querySelector("#btnAddTodo");
btnAddTodo.addEventListener("click", () => addOrEditTodo({}, tasks));

const btnDeleteAll = document.querySelector("#btnDeleteAll");
btnDeleteAll.addEventListener("click", () => deleteAll(tasks));

renderContainer("containerTodo", "countTodo", tasks, "TODO");
renderContainer("containerProgress", "countProgress", tasks, "PROGRESS");
renderContainer("containerDone", "countDone", tasks, "DONE");