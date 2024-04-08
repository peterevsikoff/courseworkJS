import { addOrEditTodo, changeStatus, delTodo } from "./handlers.js";
import { clickBackgroundModal, validText } from "./utils.js";
import { getTime } from "./clock.js";
import imgSrc from "../img/triangle.svg";
import {mouseDown} from "./dragndrop.js";

const createCard = ({id, title, description, user, time, status}, tasks) => {
    const card = document.createElement("div");
    card.classList.add("task-card");
    switch (status){
        case "TODO":
            card.classList.add("task-color-todo");
            break;
        case "PROGRESS":
            card.classList.add("task-color-inprogress");
            break;
        case "DONE":
            card.classList.add("task-color-done");
            break;
    }

    card.addEventListener("mousedown", (e) => { mouseDown(e, {id, status}, tasks) } );
    card.addEventListener("touchstart", (e) => { mouseDown(e, {id, status}, tasks) } );
    
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("task-card-header");

    const cardHeaderTitle = document.createElement("h3");
    cardHeaderTitle.textContent = title;
    cardHeaderTitle.classList.add("task-card-header-title");

    const cardHeaderActions = document.createElement("div");
    cardHeaderActions.classList.add("task-card-header-actions");
    if(status !== "DONE"){
        const editBtn = document.createElement("button");
        editBtn.textContent = status === "TODO" ? "Edit" : "Back";
        editBtn.addEventListener("click", () => { status === "TODO" ? addOrEditTodo({id, title, description, user, time}, tasks) : changeStatus({id, status}, tasks, "TODO"); });
        cardHeaderActions.append(editBtn);
    }
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = status === "TODO" || status === "DONE" ?  "Delete" : "Complete";
    deleteBtn.addEventListener("click", (e) => {e.stopPropagation(); (status === "TODO" || status === "DONE") ? delTodo({id, status}, tasks) : changeStatus({id, status}, tasks, "DONE"); });

    cardHeaderActions.append(deleteBtn);

    cardHeader.append(cardHeaderTitle, cardHeaderActions);

    const cardMain = document.createElement("div");
    cardMain.classList.add("task-card-main");
    const cardMainDescription = document.createElement("div");
    cardMainDescription.classList.add("task-card-main-description");
    const pCardMainDescription = document.createElement("p");
    
    pCardMainDescription.textContent = description;
    cardMainDescription.append(pCardMainDescription);
    cardMain.append(cardMainDescription);

    if(status === "TODO"){
        const progressBtn = document.createElement("button");
        progressBtn.textContent = ">";
        cardMain.append(progressBtn);
        progressBtn.addEventListener("click", () => { changeStatus({id, status}, tasks, "PROGRESS"); });
    }
    
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("task-card-footer");
    const cardFooterUser = document.createElement("div");
    cardFooterUser.classList.add("task-card-footer-user");
    cardFooterUser.textContent = user;
    const cardFooterTime = document.createElement("div");
    cardFooterTime.classList.add("task-card-footer-time");
    cardFooterTime.textContent = time;
    cardFooter.append(cardFooterUser, cardFooterTime);

    card.append(cardHeader, cardMain, cardFooter);
    return card;
}

const renderContainer = (idContainer, idCount, tasks, status) => {
    const array = tasks.filter((x => x.status === status));
    const container = document.querySelector(`#${idContainer}`);
    if(array.length) {
        array.forEach(x => container.append(createCard(x, tasks)));
    }
    else {
        const zeroTasks = document.createElement("div");
        zeroTasks.classList.add("task-card");
        zeroTasks.classList.add("task-card-zero");
        zeroTasks.textContent = "В этой категории нет задач";
        container.append(zeroTasks);
    }

    const count = document.querySelector(`#${idCount}`);
    count.textContent = array.length;
}

const clearContainer = (idContainer) => {
    const tasks = document.querySelector(`#${idContainer}`).querySelectorAll(".task-card");
    tasks.forEach(x => x.remove());
}

const createModalTask = (removeModal, save, item, users, data) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.addEventListener("click", clickBackgroundModal);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.append(modalContent);

    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");
    modalContent.append(modalWindow);

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("placeholder", "Title");
    inputTitle.value = item.title ?? "";
    inputTitle.addEventListener("input", (e) => { validText(e.target.value); });

    const textareaDescription = document.createElement("textarea");
    textareaDescription.setAttribute("placeholder", "Description");
    textareaDescription.value = item.description ?? "";

    const modalWindowFooter = document.createElement("div");
    modalWindowFooter.classList.add("modal-window-footer");

    const modalWindowSelect = document.createElement("div");
    modalWindowSelect.classList.add("modal-window-select");

    const selectUser = document.createElement("select");
    
    const option = document.createElement("option");
    option.textContent = "Select user";
    selectUser.append(option);

    users?.forEach(x => {
        const option = document.createElement("option");
        option.textContent = x;
        option.value = x;
        selectUser.append(option);
    });
    selectUser.value = item.user || "Select user";

    modalWindowSelect.append(selectUser);

    const modalWindowFooterActions = document.createElement("div");
    modalWindowFooterActions.classList.add("modal-window-footer-actions");

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    btnCancel.addEventListener("click", () => removeModal());

    const btnConfirm = document.createElement("button");
    btnConfirm.textContent = "Confirm";
    btnConfirm.setAttribute("id", "btnConfirmModalTodo");
    if(!item.title) btnConfirm.setAttribute("disabled", "true");

    btnConfirm.addEventListener("click", () => {
        const task = {
            id: item.id /*?? crypto.randomUUID()*/,
            title: inputTitle.value,
            description: textareaDescription.value,
            user: selectUser.value !== "Select user" ? selectUser.value : "",
            time: item.time ?? getTime(),
            status: "TODO"
        }
        save(task, data);
    });

    modalWindowFooterActions.append(btnCancel, btnConfirm);
    modalWindowFooter.append(modalWindowSelect, modalWindowFooterActions);
    modalWindow.append(inputTitle, textareaDescription, modalWindowFooter);

    return modal;
}

const createModalConfirm = (confirm, removeModal, text) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.addEventListener("click", clickBackgroundModal);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.append(modalContent);

    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");
    modalContent.append(modalWindow);

    const textContainer = document.createElement("div");
    textContainer.classList.add("modal-text-container");
    const p = document.createElement("p");
    p.textContent = text;
    textContainer.append(p);

    const modalWindowFooter = document.createElement("div");
    modalWindowFooter.classList.add("modal-window-footer");
    modalWindowFooter.classList.add("modal-window-footer-end");

    const modalWindowFooterActions = document.createElement("div");
    modalWindowFooterActions.classList.add("modal-window-footer-actions");

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    btnCancel.addEventListener("click", () => removeModal());

    const btnConfirm = document.createElement("button");
    btnConfirm.textContent = "Confirm";
    btnConfirm.addEventListener("click", () => confirm());

    modalWindowFooterActions.append(btnCancel, btnConfirm);
    modalWindowFooter.append(modalWindowFooterActions);
    modalWindow.append(textContainer, modalWindowFooter);

    return modal;
}

const createModalAlert = (removeModal, text) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.addEventListener("click", clickBackgroundModal);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.append(modalContent);

    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");
    modalContent.append(modalWindow);

    const main = document.createElement("div");
    main.classList.add("modal-main-container");

    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = imgSrc;
    imgContainer.append(img);

    const textContainer = document.createElement("div");
    textContainer.classList.add("modal-text-container");
    const p = document.createElement("p");
    p.textContent = text;
    textContainer.append(p);
    main.append(imgContainer, textContainer);

    const modalWindowFooter = document.createElement("div");
    modalWindowFooter.classList.add("modal-window-footer");
    modalWindowFooter.classList.add("modal-window-footer-end");

    const modalWindowFooterActions = document.createElement("div");
    modalWindowFooterActions.classList.add("modal-window-footer-actions");

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    btnCancel.addEventListener("click", () => removeModal());

    modalWindowFooterActions.append(btnCancel);
    modalWindowFooter.append(modalWindowFooterActions);
    modalWindow.append(main, modalWindowFooter);

    return modal;
}


export {
    renderContainer,
    createModalTask,
    clearContainer,
    createModalConfirm,
    createModalAlert
}