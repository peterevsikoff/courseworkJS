// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setData = exports.getUsers = exports.getData = void 0;
var getUsers = exports.getUsers = function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users').then(function (response) {
    return response.json();
  }).then(function (json) {
    return console.log(json);
  });
};
var tasks = [{
  id: "1",
  title: "Фильм",
  description: "Посмотреть новый фильм Н.Михалкова",
  user: "Иванов И.И.",
  time: "18:23",
  status: "TODO"
}, {
  id: "2",
  title: "Диван",
  description: "Полежать на диване смотря в потолок",
  user: "Иванов И.И.",
  time: "21:00",
  status: "TODO"
}, {
  id: "3",
  title: "Магазин",
  description: "Сходить в магазин за продуктами",
  user: "Иванов И.И.",
  time: "22:00",
  status: "PROGRESS"
}, {
  id: "4",
  title: "Читать",
  description: "Прочитать следующую главу книги \"Война и мир\"",
  user: "Иванов И.И.",
  time: "16:00",
  status: "DONE"
}];

//получить данные из localStorage
var getData = exports.getData = function getData(key) {
  var data = localStorage.getItem(key);
  return data ? JSON.parse(data) : /*[]*/tasks;
};

//записать данные в localStorage
var setData = exports.setData = function setData(key, todos) {
  localStorage.setItem(key, JSON.stringify(todos));
};
},{}],"js/clock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTime = void 0;
var getTime = exports.getTime = function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  }); //исключаем секунды
};
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validText = exports.removeModal = exports.clickBackgroundModal = void 0;
//увеличить окно, если клик вне окна
var clickBackgroundModal = exports.clickBackgroundModal = function clickBackgroundModal(e) {
  var modalWindow = document.querySelector(".modal-window");
  if (e.target.classList.contains("modal") || e.target.classList.contains("modal-content") && !modalWindow.classList.contains("modal-click-background")) {
    modalWindow.classList.add("modal-click-background");
    setTimeout(function () {
      modalWindow.classList.remove("modal-click-background");
    }, 500);
  }
};

//удалить модальное окно
var removeModal = exports.removeModal = function removeModal() {
  var modal = document.querySelector(".modal");
  modal.remove();
  document.body.classList.remove("modal-show");
};

// валидация текста
var validText = exports.validText = function validText(text) {
  var btn = document.querySelector("#btnConfirmModalTodo");
  if (text) btn.removeAttribute("disabled");else btn.setAttribute("disabled", "true");
};
},{}],"js/handlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAll = exports.delTodo = exports.changeStatus = exports.addOrEditTodo = void 0;
var _data = require("./data.js");
var _dom = require("./dom.js");
var _utils = require("./utils.js");
//добавить задачу или редактировать
var addOrEditTodo = exports.addOrEditTodo = function addOrEditTodo(item, data) {
  var body = document.body;
  body.classList.add("modal-show");
  body.append((0, _dom.createModalTask)(_utils.removeModal, save, item !== null && item !== void 0 ? item : {}, ["Иванов И.И.", "Петров П.П.", "Сидоров С.С."], data));
};
//сохранить изменения в задачи
var save = function save(item, data) {
  if (item.id) {
    //если id есть, то редактируем
    var index = data.findIndex(function (x) {
      return x.id === item.id;
    });
    data.splice(index, 1, item);
  } else {
    item.id = crypto.randomUUID();
    data.push(item);
  }
  (0, _data.setData)("tasks", data);
  (0, _dom.clearContainer)("containerTodo");
  (0, _dom.renderContainer)("containerTodo", "countTodo", data, "TODO");
  (0, _utils.removeModal)();
};
//удалить задачу
var delTodo = exports.delTodo = function delTodo(item, data) {
  var index = data.findIndex(function (x) {
    return x.id === item.id;
  });
  data.splice(index, 1);
  (0, _data.setData)("tasks", data);
  switch (item.status) {
    case "TODO":
      (0, _dom.clearContainer)("containerTodo");
      (0, _dom.renderContainer)("containerTodo", "countTodo", data, "TODO");
      break;
    case "DONE":
      (0, _dom.clearContainer)("containerDone");
      (0, _dom.renderContainer)("containerDone", "countDone", data, "DONE");
      break;
  }
};
//изменить статус
var changeStatus = exports.changeStatus = function changeStatus(item, data, newStatus) {
  if (newStatus === "PROGRESS" && data.filter(function (x) {
    return x.status === "PROGRESS";
  }).length > 5) {
    var body = document.body;
    body.classList.add("modal-show");
    body.append((0, _dom.createModalAlert)(_utils.removeModal, "Слишком много задач на выполнение! Сначала выполните текущие, а потом добавите новые!"));
    return;
  }
  var index = data.findIndex(function (x) {
    return x.id === item.id;
  });
  var newItem = data.find(function (x) {
    return x.id === item.id;
  });
  newItem.status = newStatus;
  data.splice(index, 1, newItem);
  (0, _data.setData)("tasks", data);
  (0, _dom.clearContainer)("containerProgress");
  (0, _dom.renderContainer)("containerProgress", "countProgress", data, "PROGRESS");
  switch (newStatus) {
    case "TODO":
    case "PROGRESS":
      {
        (0, _dom.clearContainer)("containerTodo");
        (0, _dom.renderContainer)("containerTodo", "countTodo", data, "TODO");
        break;
      }
    case "DONE":
      {
        (0, _dom.clearContainer)("containerDone");
        (0, _dom.renderContainer)("containerDone", "countDone", data, "DONE");
        break;
      }
  }
};
//удалить все завершенные
var deleteAll = exports.deleteAll = function deleteAll(data) {
  var confirm = function confirm() {
    //работаем по ссылке! необходимо менять исходный массив
    for (var i = 0; i < data.length; i++) {
      if (data[i].status === "DONE") {
        data.splice(i, 1);
        i--;
      }
    }
    (0, _data.setData)("tasks", data);
    (0, _utils.removeModal)();
    (0, _dom.clearContainer)("containerDone");
    (0, _dom.renderContainer)("containerDone", "countDone", data, "DONE");
  };
  var body = document.body;
  body.classList.add("modal-show");
  body.append((0, _dom.createModalConfirm)(confirm, _utils.removeModal, "Вы действительно желаете удалить все завершенные задачи?"));
};
},{"./data.js":"js/data.js","./dom.js":"js/dom.js","./utils.js":"js/utils.js"}],"img/triangle.svg":[function(require,module,exports) {
module.exports = "/triangle.fe4fc6c1.svg";
},{}],"js/dragndrop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseDown = void 0;
var _handlers = require("./handlers.js");
var mouseDown = exports.mouseDown = function mouseDown(e, item, tasks) {
  //если сработало на кнопке или на выполненной задаче, то выйти
  if (e.target.closest("button") || e.target.closest(".task-color-done")) return;

  //карточка, которую необходимо переместить
  var eventCard = e.target.closest(".task-card");

  //клонируем, чтобы оставить старую на месте
  var card = eventCard.cloneNode(true);

  //поправка на отступы, чтобы оставить под указателем мыши
  var shiftX = e.clientX - eventCard.getBoundingClientRect().left;
  var shiftY = e.clientY - eventCard.getBoundingClientRect().top;

  //позиционируем клон
  card.style.position = "absolute";
  card.style.zIndex = 1000;
  document.body.append(card);
  eventCard.classList.toggle("card-drop");
  var moveAt = function moveAt(pageX, pageY) {
    card.style.left = "".concat(pageX - shiftX, "px");
    card.style.top = "".concat(pageY - shiftY, "px");
  };
  var init = function init() {
    document.removeEventListener("mousemove", onMouseMove);
    card.remove();
    eventCard.classList.toggle("card-drop");
  };
  moveAt(e.pageX, e.pageY);
  var onMouseMove = function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);

    //чтобы найти контейнер-цель для перемещения
    card.hidden = true;
    var container = document.elementFromPoint(e.clientX, e.clientY);
    card.hidden = false;
    if (!container) return;

    //из todo и progress
    if (container.closest("#containerProgress") && eventCard.classList.contains("task-color-todo")) {
      (0, _handlers.changeStatus)(item, tasks, "PROGRESS");
      init();
    }

    //из progress в todo
    if (container.closest("#containerTodo") && eventCard.classList.contains("task-color-inprogress")) {
      (0, _handlers.changeStatus)(item, tasks, "TODO");
      init();
    }
    //из progress в done
    if (container.closest("#containerDone") && !eventCard.classList.contains("task-color-todo")) {
      (0, _handlers.changeStatus)(item, tasks, "DONE");
      init();
    }
  };

  //перемещаем
  document.addEventListener("mousemove", onMouseMove);

  //сняли кнопку, удалили клон и убрали подписку
  card.addEventListener("mouseup", init);
};
},{"./handlers.js":"js/handlers.js"}],"js/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderContainer = exports.createModalTask = exports.createModalConfirm = exports.createModalAlert = exports.clearContainer = void 0;
var _handlers = require("./handlers.js");
var _utils = require("./utils.js");
var _clock = require("./clock.js");
var _triangle = _interopRequireDefault(require("../img/triangle.svg"));
var _dragndrop = require("./dragndrop.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var createCard = function createCard(_ref, tasks) {
  var id = _ref.id,
    title = _ref.title,
    description = _ref.description,
    user = _ref.user,
    time = _ref.time,
    status = _ref.status;
  var card = document.createElement("div");
  card.classList.add("task-card");
  switch (status) {
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
  card.addEventListener("mousedown", function (e) {
    (0, _dragndrop.mouseDown)(e, {
      id: id,
      status: status
    }, tasks);
  });
  var cardHeader = document.createElement("div");
  cardHeader.classList.add("task-card-header");
  var cardHeaderTitle = document.createElement("h3");
  cardHeaderTitle.textContent = title;
  cardHeaderTitle.classList.add("task-card-header-title");
  var cardHeaderActions = document.createElement("div");
  cardHeaderActions.classList.add("task-card-header-actions");
  if (status !== "DONE") {
    var editBtn = document.createElement("button");
    editBtn.textContent = status === "TODO" ? "Edit" : "Back";
    editBtn.addEventListener("click", function () {
      status === "TODO" ? (0, _handlers.addOrEditTodo)({
        id: id,
        title: title,
        description: description,
        user: user,
        time: time
      }, tasks) : (0, _handlers.changeStatus)({
        id: id,
        status: status
      }, tasks, "TODO");
    });
    cardHeaderActions.append(editBtn);
  }
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = status === "TODO" || status === "DONE" ? "Delete" : "Complete";
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    status === "TODO" || status === "DONE" ? (0, _handlers.delTodo)({
      id: id,
      status: status
    }, tasks) : (0, _handlers.changeStatus)({
      id: id,
      status: status
    }, tasks, "DONE");
  });
  cardHeaderActions.append(deleteBtn);
  cardHeader.append(cardHeaderTitle, cardHeaderActions);
  var cardMain = document.createElement("div");
  cardMain.classList.add("task-card-main");
  var cardMainDescription = document.createElement("div");
  cardMainDescription.classList.add("task-card-main-description");
  var pCardMainDescription = document.createElement("p");
  pCardMainDescription.textContent = description;
  cardMainDescription.append(pCardMainDescription);
  cardMain.append(cardMainDescription);
  if (status === "TODO") {
    var progressBtn = document.createElement("button");
    progressBtn.textContent = ">";
    cardMain.append(progressBtn);
    progressBtn.addEventListener("click", function () {
      (0, _handlers.changeStatus)({
        id: id,
        status: status
      }, tasks, "PROGRESS");
    });
  }
  var cardFooter = document.createElement("div");
  cardFooter.classList.add("task-card-footer");
  var cardFooterUser = document.createElement("div");
  cardFooterUser.classList.add("task-card-footer-user");
  cardFooterUser.textContent = user;
  var cardFooterTime = document.createElement("div");
  cardFooterTime.classList.add("task-card-footer-time");
  cardFooterTime.textContent = time;
  cardFooter.append(cardFooterUser, cardFooterTime);
  card.append(cardHeader, cardMain, cardFooter);
  return card;
};
var renderContainer = exports.renderContainer = function renderContainer(idContainer, idCount, tasks, status) {
  var array = tasks.filter(function (x) {
    return x.status === status;
  });
  var container = document.querySelector("#".concat(idContainer));
  if (array.length) {
    array.forEach(function (x) {
      return container.append(createCard(x, tasks));
    });
  } else {
    var zeroTasks = document.createElement("div");
    zeroTasks.classList.add("task-card");
    zeroTasks.classList.add("task-card-zero");
    zeroTasks.textContent = "В этой категории нет задач";
    container.append(zeroTasks);
  }
  var count = document.querySelector("#".concat(idCount));
  count.textContent = array.length;
};
var clearContainer = exports.clearContainer = function clearContainer(idContainer) {
  var tasks = document.querySelector("#".concat(idContainer)).querySelectorAll(".task-card");
  tasks.forEach(function (x) {
    return x.remove();
  });
};
var createModalTask = exports.createModalTask = function createModalTask(removeModal, save, item, users, data) {
  var _item$title, _item$description;
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.addEventListener("click", _utils.clickBackgroundModal);
  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.append(modalContent);
  var modalWindow = document.createElement("div");
  modalWindow.classList.add("modal-window");
  modalContent.append(modalWindow);
  var inputTitle = document.createElement("input");
  inputTitle.setAttribute("placeholder", "Title");
  inputTitle.value = (_item$title = item.title) !== null && _item$title !== void 0 ? _item$title : "";
  inputTitle.addEventListener("input", function (e) {
    (0, _utils.validText)(e.target.value);
  });
  var textareaDescription = document.createElement("textarea");
  textareaDescription.setAttribute("placeholder", "Description");
  textareaDescription.value = (_item$description = item.description) !== null && _item$description !== void 0 ? _item$description : "";
  var modalWindowFooter = document.createElement("div");
  modalWindowFooter.classList.add("modal-window-footer");
  var modalWindowSelect = document.createElement("div");
  modalWindowSelect.classList.add("modal-window-select");
  var selectUser = document.createElement("select");
  var option = document.createElement("option");
  option.textContent = "Select user";
  selectUser.append(option);
  users === null || users === void 0 || users.forEach(function (x) {
    var option = document.createElement("option");
    option.textContent = x;
    option.value = x;
    selectUser.append(option);
  });
  selectUser.value = item.user || "Select user";
  modalWindowSelect.append(selectUser);
  var modalWindowFooterActions = document.createElement("div");
  modalWindowFooterActions.classList.add("modal-window-footer-actions");
  var btnCancel = document.createElement("button");
  btnCancel.textContent = "Cancel";
  btnCancel.addEventListener("click", function () {
    return removeModal();
  });
  var btnConfirm = document.createElement("button");
  btnConfirm.textContent = "Confirm";
  btnConfirm.setAttribute("id", "btnConfirmModalTodo");
  if (!item.title) btnConfirm.setAttribute("disabled", "true");
  btnConfirm.addEventListener("click", function () {
    var _item$time;
    var task = {
      id: item.id /*?? crypto.randomUUID()*/,
      title: inputTitle.value,
      description: textareaDescription.value,
      user: selectUser.value !== "Select user" ? selectUser.value : "",
      time: (_item$time = item.time) !== null && _item$time !== void 0 ? _item$time : (0, _clock.getTime)(),
      status: "TODO"
    };
    save(task, data);
  });
  modalWindowFooterActions.append(btnCancel, btnConfirm);
  modalWindowFooter.append(modalWindowSelect, modalWindowFooterActions);
  modalWindow.append(inputTitle, textareaDescription, modalWindowFooter);
  return modal;
};
var createModalConfirm = exports.createModalConfirm = function createModalConfirm(confirm, removeModal, text) {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.addEventListener("click", _utils.clickBackgroundModal);
  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.append(modalContent);
  var modalWindow = document.createElement("div");
  modalWindow.classList.add("modal-window");
  modalContent.append(modalWindow);
  var textContainer = document.createElement("div");
  textContainer.classList.add("modal-text-container");
  var p = document.createElement("p");
  p.textContent = text;
  textContainer.append(p);
  var modalWindowFooter = document.createElement("div");
  modalWindowFooter.classList.add("modal-window-footer");
  modalWindowFooter.classList.add("modal-window-footer-end");
  var modalWindowFooterActions = document.createElement("div");
  modalWindowFooterActions.classList.add("modal-window-footer-actions");
  var btnCancel = document.createElement("button");
  btnCancel.textContent = "Cancel";
  btnCancel.addEventListener("click", function () {
    return removeModal();
  });
  var btnConfirm = document.createElement("button");
  btnConfirm.textContent = "Confirm";
  btnConfirm.addEventListener("click", function () {
    return confirm();
  });
  modalWindowFooterActions.append(btnCancel, btnConfirm);
  modalWindowFooter.append(modalWindowFooterActions);
  modalWindow.append(textContainer, modalWindowFooter);
  return modal;
};
var createModalAlert = exports.createModalAlert = function createModalAlert(removeModal, text) {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.addEventListener("click", _utils.clickBackgroundModal);
  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.append(modalContent);
  var modalWindow = document.createElement("div");
  modalWindow.classList.add("modal-window");
  modalContent.append(modalWindow);
  var main = document.createElement("div");
  main.classList.add("modal-main-container");
  var imgContainer = document.createElement("div");
  var img = document.createElement("img");
  img.src = _triangle.default;
  imgContainer.append(img);
  var textContainer = document.createElement("div");
  textContainer.classList.add("modal-text-container");
  var p = document.createElement("p");
  p.textContent = text;
  textContainer.append(p);
  main.append(imgContainer, textContainer);
  var modalWindowFooter = document.createElement("div");
  modalWindowFooter.classList.add("modal-window-footer");
  modalWindowFooter.classList.add("modal-window-footer-end");
  var modalWindowFooterActions = document.createElement("div");
  modalWindowFooterActions.classList.add("modal-window-footer-actions");
  var btnCancel = document.createElement("button");
  btnCancel.textContent = "Cancel";
  btnCancel.addEventListener("click", function () {
    return removeModal();
  });
  modalWindowFooterActions.append(btnCancel);
  modalWindowFooter.append(modalWindowFooterActions);
  modalWindow.append(main, modalWindowFooter);
  return modal;
};
},{"./handlers.js":"js/handlers.js","./utils.js":"js/utils.js","./clock.js":"js/clock.js","../img/triangle.svg":"img/triangle.svg","./dragndrop.js":"js/dragndrop.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _data = require("./data.js");
var _clock = require("./clock.js");
var _dom = require("./dom.js");
var _handlers = require("./handlers.js");
//getUsers();

var clock = document.querySelector(".header-clock");
clock.textContent = (0, _clock.getTime)();
setInterval(function () {
  clock.textContent = (0, _clock.getTime)();
}, 60000);
var tasks = (0, _data.getData)("tasks");
var btnAddTodo = document.querySelector("#btnAddTodo");
btnAddTodo.addEventListener("click", function () {
  return (0, _handlers.addOrEditTodo)({}, tasks);
});
var btnDeleteAll = document.querySelector("#btnDeleteAll");
btnDeleteAll.addEventListener("click", function () {
  return (0, _handlers.deleteAll)(tasks);
});
(0, _dom.renderContainer)("containerTodo", "countTodo", tasks, "TODO");
(0, _dom.renderContainer)("containerProgress", "countProgress", tasks, "PROGRESS");
(0, _dom.renderContainer)("containerDone", "countDone", tasks, "DONE");
},{"./data.js":"js/data.js","./clock.js":"js/clock.js","./dom.js":"js/dom.js","./handlers.js":"js/handlers.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "12094" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map