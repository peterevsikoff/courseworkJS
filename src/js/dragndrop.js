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
        card.remove();
        eventCard.classList.toggle("card-drop");
    }

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e) => {
        moveAt(e.pageX, e.pageY);

        //чтобы найти контейнер-цель для перемещения
        card.hidden = true;
        let container = document.elementFromPoint(e.clientX, e.clientY);
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

    //перемещаем
    document.addEventListener("mousemove", onMouseMove);

    //сняли кнопку, удалили клон и убрали подписку
    card.addEventListener("mouseup", init);
}

export {
    mouseDown,
}