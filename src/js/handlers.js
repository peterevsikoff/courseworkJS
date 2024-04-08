import { setData, getUsers } from "./data.js";
import { clearContainer, createModalTask, createModalConfirm, createModalAlert } from "./dom.js";
import { removeModal } from "./utils.js";
import { renderContainer } from "./dom.js";

//добавить задачу или редактировать
const addOrEditTodo = (item, data) => {
    const body = document.body;
    body.classList.add("modal-show");
    //body.append(createModalTask(removeModal, save, item ?? {}, ["Иванов И.И.", "Петров П.П.", "Сидоров С.С."], data));

    getUsers().then(users => {
        body.append(createModalTask(removeModal, save, item ?? {}, users.map(x => x.name), data));
    });
//чтобы подождать users обернуть в анонимную async и немедленно вызываемую функцию
// (
//     async () => {
//         const users = await getUsers();
//         console.log(users);
//     }
// )();
}
//сохранить изменения в задачи
const save = (item, data) => {
    if (item.id) {//если id есть, то редактируем
        const index = data.findIndex(x => x.id === item.id);
        data.splice(index, 1, item);
    } else {
        item.id = crypto.randomUUID();
        data.push(item);
    }
   
    setData("tasks", data);
    clearContainer("containerTodo");
    renderContainer("containerTodo", "countTodo", data, "TODO");
    removeModal();
}
//удалить задачу
const delTodo = (item, data) => {
    const index = data.findIndex(x => x.id === item.id);
    data.splice(index, 1);
    setData("tasks", data);
    
    switch(item.status){
        case "TODO":
            clearContainer("containerTodo");
            renderContainer("containerTodo", "countTodo", data, "TODO");
            break;
        case "DONE":
            clearContainer("containerDone");
            renderContainer("containerDone", "countDone", data, "DONE");
            break;
    }
}
//изменить статус
const changeStatus = (item, data, newStatus) => {
    if(newStatus === "PROGRESS" && data.filter(x => x.status === "PROGRESS").length > 5){
        const body = document.body;
        body.classList.add("modal-show");
        body.append(createModalAlert(removeModal, "Слишком много задач на выполнение! Сначала выполните текущие, а потом добавите новые!"));
        return;
    }
    const index = data.findIndex(x => x.id === item.id);
    const newItem = data.find(x => x.id === item.id);
    newItem.status = newStatus;
    data.splice(index, 1, newItem);
    setData("tasks", data);

    clearContainer("containerProgress");
    renderContainer("containerProgress", "countProgress", data, "PROGRESS");

    switch(newStatus){
        case "TODO":
        case "PROGRESS":
            {
                clearContainer("containerTodo");
                renderContainer("containerTodo", "countTodo", data, "TODO");
                break;
            }
        case "DONE":
            {
                clearContainer("containerDone");
                renderContainer("containerDone", "countDone", data, "DONE");
                break;
            }
    }
}
//удалить все завершенные
const deleteAll = (data) => {
    const confirm = () => {
        //работаем по ссылке! необходимо менять исходный массив
        for(let i = 0; i < data.length; i++){
            if(data[i].status === "DONE"){
                data.splice(i, 1);
                i--;
            }
        }
        setData("tasks", data);
        removeModal();
        clearContainer("containerDone");
        renderContainer("containerDone", "countDone", data, "DONE");
    }

    const body = document.body;
    body.classList.add("modal-show");
    body.append(createModalConfirm(confirm, removeModal, "Вы действительно желаете удалить все завершенные задачи?"));
}

export {
    addOrEditTodo,
    delTodo,
    changeStatus,
    deleteAll
}