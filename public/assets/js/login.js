/*==========================================================
    Explore Brasil
    login.js

    Responsável por:
    ✔ Login
    ✔ Cadastro
    ✔ Logout
    ✔ Sessão
    ✔ Verificação de administrador
==========================================================*/

const API_USUARIOS = "http://localhost:3000/usuarios";

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
    Configura formulário de login
==========================================================*/

function configurarFormularioLogin() {

    const form = document.getElementById("formLogin");

    if (form) {

        form.addEventListener("submit", loginUser);

    }

}

/*==========================================================
    Configura formulário de cadastro
==========================================================*/

function configurarFormularioCadastro() {

    const form = document.getElementById("formCadastro");

    if (form) {

        form.addEventListener("submit", cadastrarUsuario);

    }

}

/*==========================================================
    Recupera sessão
==========================================================*/

function verificarSessao() {

    const usuario = sessionStorage.getItem("usuarioCorrente");

    if (usuario) {

        usuarioCorrente = JSON.parse(usuario);

    }

}

/*==========================================================
    LOGIN
==========================================================*/

async function loginUser(event) {

    event.preventDefault();

    const login = document.getElementById("login").value.trim();

    const senha = document.getElementById("senha").value.trim();

    try {

        const resposta = await fetch(API_USUARIOS);

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

        alert(`Bem-vindo(a), ${usuario.nome}!`);

        window.location.href = "index.html";

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o servidor.");

    }

}

/*==========================================================
    CADASTRAR USUÁRIO
==========================================================*/

async function cadastrarUsuario(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const login = document.getElementById("login").value.trim();

    const senha = document.getElementById("senha").value.trim();

    const confirmarSenha = document.getElementById("confirmarSenha");

    if (confirmarSenha) {

        if (senha !== confirmarSenha.value.trim()) {

            alert("As senhas não conferem.");

            return;

        }

    }

    try {

        const resposta = await fetch(API_USUARIOS);

        const usuarios = await resposta.json();

        const existe = usuarios.find(u =>

            u.login === login ||

            u.email === email

        );

        if (existe) {

            alert("Já existe um usuário com este login ou e-mail.");

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

        const cadastro = await fetch(API_USUARIOS, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(novoUsuario)

        });

        if (!cadastro.ok) {

            throw new Error("Erro ao cadastrar.");

        }

        alert("Cadastro realizado com sucesso!");

        window.location.href = "login.html";

    }

    catch (erro) {

        console.error(erro);

        alert("Não foi possível cadastrar o usuário.");

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
    Retorna usuário atual
==========================================================*/

function getUsuarioCorrente() {

    return JSON.parse(

        sessionStorage.getItem("usuarioCorrente")

    );

}

/*==========================================================
    Usuário logado?
==========================================================*/

function usuarioEstaLogado() {

    return getUsuarioCorrente() !== null;

}

/*==========================================================
    Administrador?
==========================================================*/

function usuarioEhAdmin() {

    const usuario = getUsuarioCorrente();

    if (!usuario) {

        return false;

    }

    return usuario.admin === true;

}

/*==========================================================
    Proteção de páginas
==========================================================*/

function protegerPagina() {

    if (!usuarioEstaLogado()) {

        alert("Você precisa estar logado.");

        window.location.href = "login.html";

    }

}

/*==========================================================
    Proteção do CRUD
==========================================================*/

function protegerAdministrador() {

    protegerPagina();

    if (!usuarioEhAdmin()) {

        alert("Acesso permitido apenas para administradores.");

        window.location.href = "index.html";

    }

}