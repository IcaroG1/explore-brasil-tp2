/*==========================================================
    Explore Brasil
    detalhes.js
==========================================================*/

const API_USUARIOS_DETALHES = "http://localhost:3000/usuarios";

/*==========================================================
    Obtém o ID da URL
==========================================================*/

const parametros = new URLSearchParams(window.location.search);
const idLugar = parametros.get("id");

/*==========================================================
    Inicialização
==========================================================*/

window.addEventListener("load", () => {

    carregarDetalhes();

});

/*==========================================================
    Carrega informações do destino
==========================================================*/

async function carregarDetalhes() {

    try {

        const resposta = await fetch(`${API.lugares}/${idLugar}`);

        const lugar = await resposta.json();

        mostrarLugar(lugar);

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar o destino.");

    }

}

/*==========================================================
    Exibe o destino
==========================================================*/

function mostrarLugar(lugar) {

    const usuario = getUsuarioCorrente();

    let textoBotao = "⭐ Favoritar";

    if (usuario && usuario.favoritos.includes(lugar.id)) {

        textoBotao = "❤️ Remover dos Favoritos";

    }

    const div = document.getElementById("detalhesLugar");

    div.innerHTML = `

    <div class="card shadow">

        <img
            src="${lugar.imagem}"
            class="card-img-top"
            style="max-height:500px; object-fit:cover;">

        <div class="card-body">

            <h2 class="mb-3">

                ${lugar.nome}

            </h2>

            <hr>

            <p>

                <strong>Cidade:</strong>

                ${lugar.cidade}

            </p>

            <p>

                <strong>Estado:</strong>

                ${lugar.estado}

            </p>

            <p>

                <strong>Categoria:</strong>

                ${lugar.categoria}

            </p>

            <p>

                <strong>Avaliação:</strong>

                ⭐ ${lugar.avaliacao ?? "-"}

            </p>

            <p>

                ${lugar.descricao}

            </p>

            <a
                href="index.html"
                class="btn btn-success">

                <i class="bi bi-arrow-left"></i>

                Voltar

            </a>

            <button
                class="btn btn-warning ms-2"
                onclick="alternarFavorito('${lugar.id}')">

                ${textoBotao}

            </button>

        </div>

    </div>

    `;

}

/*==========================================================
    Favoritar / Remover Favorito
==========================================================*/

async function alternarFavorito(idLugar) {

    const usuario = getUsuarioCorrente();

    if (!usuario) {

        alert("Faça login para utilizar os favoritos.");

        window.location.href = "login.html";

        return;

    }

    try {

        let favoritos = usuario.favoritos || [];

        if (favoritos.includes(idLugar)) {

            favoritos = favoritos.filter(id => id !== idLugar);

        }

        else {

            favoritos.push(idLugar);

        }

        usuario.favoritos = favoritos;

        await fetch(`${API_USUARIOS_DETALHES}/${usuario.id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(usuario)

        });

        sessionStorage.setItem(

            "usuarioCorrente",

            JSON.stringify(usuario)

        );

        carregarDetalhes();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar favoritos.");

    }

}