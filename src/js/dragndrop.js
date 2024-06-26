import { changeStatus } from "./handlers.js";

const mouseDown = (e, item, tasks) => {
    //если сработало на кнопке или на выполненной задаче, то выйти
    if (e.target.closest("button") || e.target.closest(".task-color-done")) return;

    //карточка, которую необходимо переместить
    const eventCard = e.target.closest(".task-card");

    //клонируем, чтобы оставить старую на месте
    const card = eventCard.cloneNode(true);

    //поправка на отступы, чтобы оставить под указателем мыши
    let shiftX = e.clientX - eventCard.getBoundingClientRect().left;
    let shiftY = e.clientY - eventCard.getBoundingClientRect().top;

    //позиционируем клон
    card.style.position = "absolute";
    card.style.zIndex = 1000;
    document.body.append(card);

    eventCard.classList.toggle("card-drop");

    const moveAt = (pageX, pageY) => {
        card.style.left = `${pageX - shiftX}px`;
        card.style.top = `${pageY - shiftY}px`;
    }

    const init = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchmove", touchMove);
        card.remove();
        eventCard.classList.toggle("card-drop");
        document.body.style.overflow = "auto";
    }

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e) => {
        moveAt(e.pageX, e.pageY);

        //чтобы найти контейнер-цель для перемещения
        card.hidden = true;
        let container = e.type !== "mousemove" ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) : document.elementFromPoint(e.clientX, e.clientY);
        card.hidden = false;
        if (!container) return;

        //из todo и progress
        if (container.closest("#containerProgress") && eventCard.classList.contains("task-color-todo")) {
            changeStatus(item, tasks, "PROGRESS");
            init();
        }

        //из progress в todo
        if (container.closest("#containerTodo") && eventCard.classList.contains("task-color-inprogress")) {
            changeStatus(item, tasks, "TODO");
            init();
        }
        //из progress в done
        if (container.closest("#containerDone") && !eventCard.classList.contains("task-color-todo")) {
            changeStatus(item, tasks, "DONE");
            init();
        }
    }

    const touchMove = () => {
        document.body.style.overflow = "hidden";
    }

    //перемещаем
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchmove", touchMove);

    //сняли кнопку, удалили клон и убрали подписку
    card.addEventListener("mouseup", init);
    eventCard.addEventListener("touchend", init);
    eventCard.addEventListener("touchcancel", init);
}

export {
    mouseDown,
}