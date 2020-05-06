// https://jsonplaceholder.typicode.com/users
// name, email, username, phone, website

const addBtn = document.querySelector(".btn__add");
const userBlockForm = document.querySelector(".form__user");
const collapsible = document.querySelector(".collapsible");
const userForm = document.forms["addUser"];

// Отправляет форму
userForm.addEventListener("submit", submitHendler);

// Скрывает показывает форму
addBtn.addEventListener("click", showFormHendler);

function showFormHendler(event) {
    event.preventDefault();
    userBlockForm.classList.toggle("hide");
    const i = addBtn.querySelector(".material-icons");
    if (i.textContent == "add") {
        i.textContent = "remove";
    } else if (i.textContent == "remove") {
        i.textContent = "add";
    }
}

// Добавляет нового usera на страницу
function submitHendler(event) {
    event.preventDefault();
    const name = userForm.elements['name'];
    const email = userForm.elements['email'];
    const username = userForm.elements['username'];
    const phone = userForm.elements['phone'];
    const website = userForm.elements['web'];

    const newUser = createUserObject(name.value, email.value, username.value, phone.value, website.value);
    const liNewUser = creaeLi(newUser);

    collapsible.insertAdjacentElement("afterbegin", liNewUser);
    userForm.reset();
    postUser(newUser, (user) => {
        console.log(user);
    });
    // userBlockForm.classList.toggle("hide");

}

// Формирует userObject
function createUserObject(name, email, username, phone, website) {
    const userObject = {
        name,
        email,
        username,
        phone,
        website
    };
    return userObject;
}

// AJAX GET
function getUsers(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.addEventListener("load", () => {
        const users = JSON.parse(xhr.responseText)
        cb(users)
    })

    xhr.addEventListener("error", () => {
        console.log("ERROR");
    })

    xhr.send();
}

// AJAX POST
function postUser(object, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
    xhr.addEventListener("load", () => {
        const user = JSON.parse(xhr.responseText);
        cb(user);
    });

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    xhr.addEventListener("error", () => {
        console.log("ERROR");
    });

    xhr.send(JSON.stringify(object));
}

// Формирует фрагмент из полученных данных с сервера
getUsers((users) => {
    const fragment = document.createDocumentFragment();
    users.forEach(user => {
        fragment.appendChild(creaeLi(user));
    })
    collapsible.appendChild(fragment);
});

// Создает li для одного юзера
function creaeLi(user) {
    const li = accCreateElement("li");
    const div = accCreateElement("div", ["collapsible-header"]);
    const divBody = accCreateElement("div", ["collapsible-body"]);
    const i = accCreateElement("i", ["material-icons"], "account_box");
    div.appendChild(i);
    div.append(user.name);
    divBody.insertAdjacentHTML('afterbegin',
        `<p>Username: <b>${user.username}</b></p>
    <p>E-Mail: <a href="mailto:${user.email}">${user.email}</a></p>
    <p>Phone: <a href="tel:${user.phone}">${user.phone}</a></p>
    <p>Website: <a href="${user.website}">${user.website}</a></p>`);
    li.appendChild(div);
    li.appendChild(divBody);
    return li;
}

// Вспомогательная функция создает елементы, добавляет классы и контент
function accCreateElement(el, arrClass, cont) {
    const element = document.createElement(el);
    if (arrClass) {
        arrClass.forEach(item => {
            element.classList.add(item);
        });
    }
    if (cont) {
        element.append(cont);
    }
    return element;
}

// Materialize code for accordion
document.addEventListener('DOMContentLoaded', function () {
    const elem = document.querySelector('.collapsible');
    const instance = M.Collapsible.init(elem, {
        accordion: false
    });
})