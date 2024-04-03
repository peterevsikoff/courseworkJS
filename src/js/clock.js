const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });//исключаем секунды
}

export {
    getTime,
}