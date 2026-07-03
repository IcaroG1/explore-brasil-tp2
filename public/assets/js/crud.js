/* ==========================================================
    Explore Brasil
    CRUD de Destinos Turísticos
========================================================== */

const API_LUGARES = "http://localhost:3000/lugares";

/* ==========================================================
    Inicialização
========================================================== */

window.addEventListener("load", () => {

    protegerAdministrador();

    configurarEventos();

    carregarLugares();

});

/* ==========================================================
    Eventos
========================================================== */

function configurarEventos() {

    document
        .getElementById("formLugar")
        .addEventListener("submit", salvarLugar);

    // Slider da avaliação
    const avaliacao = document.getElementById("avaliacao");
    const valorNota = document.getElementById("valorNota");

    valorNota.textContent = avaliacao.value;

    avaliacao.addEventListener("input", () => {

        valorNota.textContent = avaliacao.value;

    });

    // Pré-visualização da imagem
    const imagem = document.getElementById("imagem");

    imagem.addEventListener("change", () => {

        document.getElementById("preview").src = imagem.value;

    });

}

/* ==========================================================
    Carrega lugares
========================================================== */

async function carregarLugares() {

    try {

        const resposta = await fetch(API_LUGARES);

        const lugares = await resposta.json();

        montarTabela(lugares);

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar destinos.");

    }

}

/* ==========================================================
    Monta tabela
========================================================== */

function montarTabela(lugares) {

    const tabela = document.getElementById("tabelaLugares");

    tabela.innerHTML = "";

    lugares.forEach(lugar => {

        tabela.innerHTML += `

        <tr>

            <td>

                <img
                    src="${lugar.imagem}"
                    width="90"
                    class="rounded shadow-sm">

            </td>

            <td>${lugar.nome}</td>

            <td>${lugar.categoria}</td>

            <td>${lugar.cidade}</td>

            <td>${lugar.estado}</td>

            <td>${lugar.avaliacao ?? "-"}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarLugar('${lugar.id}')">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="excluirLugar('${lugar.id}')">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

/* ==========================================================
    Salvar
========================================================== */

async function salvarLugar(event) {

    event.preventDefault();

    const id = document.getElementById("id").value;

    const lugar = {

        nome: document.getElementById("nome").value.trim(),

        cidade: document.getElementById("cidade").value.trim(),

        estado: document.getElementById("estado").value,

        categoria: document.getElementById("categoria").value,

        imagem: document.getElementById("imagem").value,

        descricao: document.getElementById("descricao").value.trim(),

        avaliacao: Number(document.getElementById("avaliacao").value),

        destaque: document.getElementById("destaque").checked

    };

    try {

        if (id === "") {

            await fetch(API_LUGARES, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(lugar)

            });

            alert("Destino cadastrado com sucesso!");

        }

        else {

            await fetch(`${API_LUGARES}/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    id,

                    ...lugar

                })

            });

            alert("Destino atualizado com sucesso!");

        }

        limparFormulario();

        carregarLugares();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao salvar destino.");

    }

}

/* ==========================================================
    Editar
========================================================== */

async function editarLugar(id) {

    try {

        const resposta = await fetch(`${API_LUGARES}/${id}`);

        const lugar = await resposta.json();

        document.getElementById("id").value = lugar.id;

        document.getElementById("nome").value = lugar.nome;

        document.getElementById("cidade").value = lugar.cidade;

        document.getElementById("estado").value = lugar.estado;

        document.getElementById("categoria").value = lugar.categoria;

        document.getElementById("imagem").value = lugar.imagem;

        document.getElementById("preview").src = lugar.imagem;

        document.getElementById("descricao").value = lugar.descricao;

        document.getElementById("avaliacao").value = lugar.avaliacao ?? 5;

        document.getElementById("valorNota").textContent = lugar.avaliacao ?? 5;

        document.getElementById("destaque").checked = lugar.destaque;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar o destino.");

    }

}

/* ==========================================================
    Excluir
========================================================== */

async function excluirLugar(id) {

    const confirmar = confirm(

        "Deseja realmente excluir este destino?"

    );

    if (!confirmar) return;

    try {

        await fetch(`${API_LUGARES}/${id}`, {

            method: "DELETE"

        });

        carregarLugares();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao excluir.");

    }

}

/* ==========================================================
    Limpar formulário
========================================================== */

function limparFormulario() {

    document.getElementById("formLugar").reset();

    document.getElementById("id").value = "";

    document.getElementById("preview").src = "assets/img/cristo.jpg";

    document.getElementById("avaliacao").value = 5;

    document.getElementById("valorNota").textContent = "5.0";

}