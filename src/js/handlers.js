import { createModalTask } from "./dom.js";
import { removeModal } from "./utils.js";

//добавить задачу или редактировать
const addOrEditTodo = (item) => {
    const body = document.body;
    body.classList.add("modal-show");
    body.append(createModalTask(removeModal, save, item ?? {}, ["Иванов И.И.", "Петров П.П.", "Сидоров С.С."]));
}

//сохранить изменения в задачи
const save = (item) => {
    console.log(item);





    
    removeModal();
}

export {
    addOrEditTodo,
}