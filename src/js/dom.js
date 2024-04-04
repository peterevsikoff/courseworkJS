import { addOrEditTodo } from "./handlers.js";
import { clickBackgroundModal, validText } from "./utils.js";
import { getTime } from "./clock.js";

const createCard = ({title, description, user, time, status}) => {
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
        editBtn.addEventListener("click", () => { status === "TODO" && addOrEditTodo({title, description, user, time}); });
        cardHeaderActions.append(editBtn);
    }
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = status === "TODO" || status === "DONE" ?  "Delete" : "Complete";
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

const renderContainer = (idContainer, idCount, array) => {
    const container = document.querySelector(`#${idContainer}`);
    array.forEach(x => container.append(createCard(x)));

    const count = document.querySelector(`#${idCount}`);
    count.textContent = array.length;
}

const createModalTask = (removeModal, save, item, users) => {
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
    selectUser.value = item.user ?? "Select user";

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
            id: item.id ?? crypto.randomUUID(),
            title: inputTitle.value,
            description: textareaDescription.value,
            user: selectUser.value !== "Select user" ? selectUser.value : "",
            time: item.time ?? getTime()
        }
        save(task);
    });

    modalWindowFooterActions.append(btnCancel, btnConfirm);
    modalWindowFooter.append(modalWindowSelect, modalWindowFooterActions);
    modalWindow.append(inputTitle, textareaDescription, modalWindowFooter);

    return modal;
}






export {
    renderContainer,
    createModalTask,
}