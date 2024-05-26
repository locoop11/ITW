"use strict";

const USER_DATA = "userData";

window.addEventListener("load", principal);

function principal() {
    const formLogin = document.getElementById("frmLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", checkData);
    }

    const formRegister = document.getElementById("frmRegister");
    if (formRegister) {
        formRegister.addEventListener("submit", addData);
    }
}

/**
 * Função para adicionar um novo usuário
 * @param {Event} event
 */
function addData(event) {
    event.preventDefault();

    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    let users = JSON.parse(localStorage.getItem(USER_DATA)) || [];

    // Verificar se o email já existe
    const userExists = users.some(user => user.email === email);
    
    if (!userExists) {
        const newUser = {
            email: email,
            password: password,
            isLoggedIn: true // Marca o usuário como logado após o registro
        };

        users.push(newUser);

        localStorage.setItem(USER_DATA, JSON.stringify(users));
        alert("Email registered successfully");
        window.location.href = "Home.html"; // Redireciona para Home após o registro
    } else {
        alert("Email already registered");
    }
}

/**
 * Função para verificar as credenciais de login
 * @param {Event} event
 */
function checkData(event) {
    event.preventDefault();

    const enterEmail = document.getElementById("email").value;
    const enterPassword = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem(USER_DATA)) || [];
    const user = users.find(user => user.email === enterEmail && user.password === enterPassword);

    if (user) {
        alert("Login Successful");
        user.isLoggedIn = true;
        localStorage.setItem(USER_DATA, JSON.stringify(users));
        window.location.href = "Home.html";
    } else {
        alert("Invalid Email or Password");
    }
}