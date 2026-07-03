/* ==========================================================
   Explore Brasil
   app.js

   Responsável por:
   ✔ Buscar os lugares no JSON Server
   ✔ Criar os cards
   ✔ Criar o carrossel
   ✔ Fazer a pesquisa
========================================================== */

const API_URL = "http://localhost:3000/lugares";

let lugares = [];

/* ==========================================
   Quando a página carregar
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    carregarLugares();

    const pesquisa = document.getElementById("pesquisa");

    pesquisa.addEventListener("keyup", pesquisar);

});

/* ==========================================
   Buscar lugares
========================================== */

async function carregarLugares() {

    try {

        const resposta = await fetch(API_URL);

        lugares = await resposta.json();

        criarCards(lugares);

        criarCarousel(lugares);

    }

    catch (erro) {

        console.error("Erro ao carregar lugares:", erro);

    }

}

/* ==========================================
   Criar Cards
========================================== */

function criarCards(lista) {

    const container = document.getElementById("listaLugares");

    container.innerHTML = "";

    lista.forEach(lugar => {

        container.innerHTML += `

        <div class="col-lg-4 col-md-6">

            <div class="card h-100 shadow">

                <img
                    src="${lugar.imagem}"
                    class="card-img-top"
                    alt="${lugar.nome}">

                <div class="card-body">

                    <h4 class="card-title">

                        ${lugar.nome}

                    </h4>

                    <p>

                        <strong>Estado:</strong>

                        ${lugar.estado}

                    </p>

                    <p>

                        <strong>Categoria:</strong>

                        ${lugar.categoria}

                    </p>

                    <p class="card-text">

                        ${lugar.descricao}

                    </p>

                </div>

                <div class="card-footer bg-white">

                    <a
                        href="detalhes.html?id=${lugar.id}"
                        class="btn btn-success w-100">

                        Ver detalhes

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

/* ==========================================
   Criar Carrossel
========================================== */

function criarCarousel(lista) {

    const carousel = document.getElementById("carouselConteudo");

    carousel.innerHTML = "";

    const destaques = lista.filter(lugar => lugar.destaque);

    destaques.forEach((lugar, indice) => {

        carousel.innerHTML += `

        <div class="carousel-item ${indice == 0 ? "active" : ""}">

            <img
                src="${lugar.imagem}"
                class="d-block w-100"
                alt="${lugar.nome}">

            <div class="carousel-caption">

                <h2>

                    ${lugar.nome}

                </h2>

                <p>

                    ${lugar.descricao}

                </p>

            </div>

        </div>

        `;

    });

}

/* ==========================================
   Pesquisa
========================================== */

function pesquisar() {

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const resultado = lugares.filter(lugar =>

        lugar.nome.toLowerCase().includes(texto) ||

        lugar.estado.toLowerCase().includes(texto) ||

        lugar.categoria.toLowerCase().includes(texto)

    );

    criarCards(resultado);

}