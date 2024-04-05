const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => console.log(json))
}

const tasks = [
    {
        id: "1",
        title: "Фильм",
        description: "Посмотреть новый фильм Н.Михалкова",
        user: "Иванов И.И.",
        time: "18:23",
        status: "TODO"
    },
    {
        id: "2",
        title: "Диван",
        description: "Полежать на диване смотря в потолок",
        user: "Иванов И.И.",
        time: "21:00",
        status: "TODO"
    },
    {
        id: "3",
        title: "Магазин",
        description: "Сходить в магазин за продуктами",
        user: "Иванов И.И.",
        time: "22:00",
        status: "PROGRESS"
    },
    {
        id: "4",
        title: "Читать",
        description: "Прочитать следующую главу книги \"Война и мир\"",
        user: "Иванов И.И.",
        time: "16:00",
        status: "DONE"
    }
]

//получить данные из localStorage
const getData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : /*[]*/ tasks;
}

//записать данные в localStorage
const setData = (key, todos) => {
    localStorage.setItem(key, JSON.stringify(todos));
}

export {
    getUsers,
    getData,
    setData
}