import { getUsers } from "./data.js";
import { getTime } from "./clock.js";

getUsers();

const clock = document.querySelector(".header-clock");
clock.textContent = getTime();
setInterval(()=>{
    clock.textContent = getTime();
}, 60000);