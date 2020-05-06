// https://jsonplaceholder.typicode.com/users
// name, email, username, phone, website

const addBtn = document.querySelector(".btn__add");
const userForm = document.querySelector(".form__user");
const cardUser = document.querySelector(".card__user");
const collapsible = document.querySelector(".collapsible");

addBtn.addEventListener("click", showFormHendler)
function showFormHendler(event) {
    event.preventDefault();
    userForm.classList.toggle("hide");
    console.log(userForm);
}

// AJAX
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

getUsers((users) => {
    const fragment = document.createDocumentFragment();
    users.forEach(user => {
        fragment.appendChild(creaeLi(user));
    })
    collapsible.appendChild(fragment);
})

// Создает одного юзера
function creaeLi(user) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("collapsible-header");
    const divBody = document.createElement("div");
    divBody.classList.add("collapsible-body");
    const p = document.createElement("p");
    const i = document.createElement("i");
    i.classList.add("material-icons");
    i.textContent ="account_box";
    div.appendChild(i);
    div.append(user.name);
    divBody.insertAdjacentHTML('afterbegin',
    `<p>Username: <b>${user.username}</b></p>
    <p>E-Mail: <a href="mailto:${user.email}">${user.email}</a></p>
    <p>Phone: <a href="tel:${user.phone}">${user.phone}</a></p>
    <p>Website: <a href="${user.website}">${user.website}</a></p>`)
    li.appendChild(div);
    li.appendChild(divBody);
    return li
}

// Materialize code for accordion
document.addEventListener('DOMContentLoaded', function() {
    const elem = document.querySelector('.collapsible');
    const instance = M.Collapsible.init(elem, {accordion: false});
});
