import { getUsers } from "./data.js";
import { getTime } from "./clock.js";
import { renderContainer } from "./dom.js";

getUsers();

const clock = document.querySelector(".header-clock");
clock.textContent = getTime();
setInterval(()=>{
    clock.textContent = getTime();
}, 60000);

const tasks = [
    {
        title: "Фильм",
        description: "Посмотреть новый фильм Н.Михалкова",
        user: "Иванов И.И.",
        time: "18:23",
        status: "TODO"
    },
    {
        title: "Диван",
        description: "Полежать на диване смотря в потолок",
        user: "Иванов И.И.",
        time: "21:00",
        status: "TODO"
    },
    {
        title: "Магазин",
        description: "Сходить в магазин за продуктами",
        user: "Иванов И.И.",
        time: "22:00",
        status: "PROGRESS"
    },
    {
        title: "Читать",
        description: "Прочитать следующую главу книги \"Война и мир\"",
        user: "Иванов И.И.",
        time: "16:00",
        status: "DONE"
    }
]

const todos = tasks.filter(x => x.status === "TODO");
renderContainer("containerTodo", "countTodo", todos);

const progress = tasks.filter(x => x.status === "PROGRESS");
renderContainer("containerProgress", "countProgress", progress);

const done = tasks.filter(x => x.status === "DONE");
renderContainer("containerDone", "countDone", done);