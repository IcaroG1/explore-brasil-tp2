/*==========================================================
    Explore Brasil
    grafico.js

    Exibe um gráfico de barras mostrando
    a quantidade de destinos por categoria.
==========================================================*/

const API_GRAFICO = "http://localhost:3000/lugares";

/*==========================================================
    Inicialização
==========================================================*/

window.addEventListener("load", carregarGrafico);

/*==========================================================
    Carregar dados
==========================================================*/

async function carregarGrafico() {

    try {

        const resposta = await fetch(API_GRAFICO);

        const lugares = await resposta.json();

        criarGrafico(lugares);

    }

    catch (erro) {

        console.error("Erro ao carregar gráfico:", erro);

    }

}

/*==========================================================
    Criar gráfico
==========================================================*/

function criarGrafico(lugares) {

    const categorias = {};

    lugares.forEach(lugar => {

        if (categorias[lugar.categoria]) {

            categorias[lugar.categoria]++;

        }

        else {

            categorias[lugar.categoria] = 1;

        }

    });

    const labels = Object.keys(categorias);

    const dados = Object.values(categorias);

    const ctx = document
        .getElementById("graficoCategorias")
        .getContext("2d");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Quantidade de destinos",

                data: dados,

                backgroundColor: [

                    "#198754",
                    "#20c997",
                    "#0d6efd",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#fd7e14"

                ],

                borderColor: "#146c43",

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                },

                title: {

                    display: true,

                    text: "Destinos cadastrados por categoria"

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 1

                    }

                }

            }

        }

    });

}