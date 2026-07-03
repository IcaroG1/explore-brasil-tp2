/*==============================================
    API
==============================================*/

const API = "http://localhost:3000/lugares";

/*==============================================
    Captura o ID da URL
==============================================*/

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

/*==============================================
    Carregar detalhes
==============================================*/

async function carregarDetalhes() {

    try {

        const resposta = await fetch(`${API}/${id}`);

        const lugar = await resposta.json();

        mostrarLugar(lugar);

    }

    catch (erro) {

        console.log(erro);

    }

}

carregarDetalhes();

/*==============================================
    Mostrar informações
==============================================*/

function mostrarLugar(lugar) {

    const div = document.getElementById("detalhesLugar");

    div.innerHTML = `

    <div class="card shadow">

        <img
            src="${lugar.imagem}"
            class="card-img-top">

        <div class="card-body">

            <h2>

                ${lugar.nome}

            </h2>

            <hr>

            <p>

                <strong>Estado:</strong>

                ${lugar.estado}

            </p>

            <p>

                <strong>Cidade:</strong>

                ${lugar.cidade}

            </p>

            <p>

                <strong>Categoria:</strong>

                ${lugar.categoria}

            </p>

            <p>

                ${lugar.descricao}

            </p>

            <a
                href="index.html"
                class="btn btn-success">

                Voltar

            </a>

            <button
                class="btn btn-warning ms-2"
                onclick="adicionarFavorito(${lugar.id})">

                <i class="bi bi-star-fill"></i>

                Favoritar

            </button>

        </div>

    </div>

    `;

}

/*==============================================
    Favoritos
==============================================*/

function adicionarFavorito(id){

    alert("Na próxima etapa iremos implementar o sistema de favoritos.");

}