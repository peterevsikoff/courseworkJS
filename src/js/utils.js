//увеличить окно, если клик вне окна
const clickBackgroundModal = (e) => {
    const modalWindow = document.querySelector(".modal-window");
    if(e.target.classList.contains("modal") || e.target.classList.contains("modal-content") && !modalWindow.classList.contains("modal-click-background")){
        modalWindow.classList.add("modal-click-background");
        setTimeout(()=>{
            modalWindow.classList.remove("modal-click-background");
        }, 500);
    }
}

//удалить модальное окно
const removeModal = () => {
    const modal = document.querySelector(".modal");
    modal.remove();
    document.body.classList.remove("modal-show");
}

// валидация текста
const validText = (text) => {
    const btn = document.querySelector("#btnConfirmModalTodo");
    if(text)
        btn.removeAttribute("disabled");
    else
        btn.setAttribute("disabled", "true");
}

export {
    clickBackgroundModal,
    removeModal,
    validText,
}