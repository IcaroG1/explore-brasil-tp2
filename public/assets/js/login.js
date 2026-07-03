/* ==========================================================
    Explore Brasil
    login.js

    Adaptado do LoginApp do professor

    Responsável por:
    ✔ Login
    ✔ Cadastro
    ✔ Logout
    ✔ Sessão
    ✔ JSON Server
==========================================================*/

const API = "http://localhost:3000/usuarios";

/*==========================================================
    Usuário logado
==========================================================*/

let usuarioCorrente = null;

/*==========================================================
    Inicialização
==========================================================*/

window.addEventListener("load", () => {

    verificarSessao();

    configurarFormularioLogin();

    configurarFormularioCadastro();

});

/*==========================================================
    Verifica se existe usuário logado
==========================================================*/

function verificarSessao() {

    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (usuario) {

        usuarioCorrente = JSON.parse(usuario);

    }

}

/*==========================================================
    Configura formulário de Login
==========================================================*/

function configurarFormularioLogin() {

    const form = document.getElementById("formLogin");

    if (!form) return;

    form.addEventListener("submit", loginUser);

}

/*==========================================================
    Configura formulário de Cadastro
==========================================================*/

function configurarFormularioCadastro() {

    const form = document.getElementById("formCadastro");

    if (!form) return;

    form.addEventListener("submit", cadastrarUsuario);

}

/*==========================================================
    LOGIN
==========================================================*/

async function loginUser(event) {

    event.preventDefault();

    const login = document.getElementById("login").value.trim();

    const senha = document.getElementById("senha").value.trim();

    try {

        const resposta = await fetch(API);

        const usuarios = await resposta.json();

        const usuario = usuarios.find(u =>

            u.login === login &&
            u.senha === senha

        );

        if (!usuario) {

            alert("Login ou senha inválidos.");

            return;

        }

        usuarioCorrente = usuario;

        sessionStorage.setItem(

            "usuarioCorrente",

            JSON.stringify(usuario)

        );

        alert("Login realizado com sucesso!");

        window.location.href = "index.html";

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao conectar ao servidor.");

    }

}

/*==========================================================
    CADASTRO
==========================================================*/

async function cadastrarUsuario(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const login = document.getElementById("login").value.trim();

    const senha = document.getElementById("senha").value.trim();

    try {

        const resposta = await fetch(API);

        const usuarios = await resposta.json();

        const existe = usuarios.find(u =>

            u.login === login ||

            u.email === email

        );

        if (existe) {

            alert("Usuário já cadastrado.");

            return;

        }

        const novoUsuario = {

            id: crypto.randomUUID(),

            nome,

            email,

            login,

            senha,

            admin: false,

            favoritos: []

        };

        await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(novoUsuario)

        });

        alert("Cadastro realizado com sucesso!");

        window.location.href = "login.html";

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar usuário.");

    }

}

/*==========================================================
    LOGOUT
==========================================================*/

function logoutUser() {

    sessionStorage.removeItem("usuarioCorrente");

    usuarioCorrente = null;

    window.location.href = "login.html";

}

/*==========================================================
    Verifica Login
==========================================================*/

function usuarioEstaLogado() {

    return sessionStorage.getItem("usuarioCorrente") != null;

}

/*==========================================================
    Usuário Atual
==========================================================*/

function getUsuarioCorrente() {

    return JSON.parse(

        sessionStorage.getItem("usuarioCorrente")

    );

}

/*==========================================================
    Verifica Administrador
==========================================================*/

function usuarioEhAdmin() {

    const usuario = getUsuarioCorrente();

    if (!usuario) return false;

    return usuario.admin === true;

}

/*==========================================================
    Proteção de páginas
==========================================================*/

function protegerPagina() {

    if (!usuarioEstaLogado()) {

        alert("Faça login para acessar esta página.");

        window.location.href = "login.html";

    }

}

/*==========================================================
    Proteção do CRUD
==========================================================*/

function protegerAdministrador() {

    protegerPagina();

    if (!usuarioEhAdmin()) {

        alert("Apenas administradores podem acessar esta página.");

        window.location.href = "index.html";

    }

}