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


export {
    renderContainer
}