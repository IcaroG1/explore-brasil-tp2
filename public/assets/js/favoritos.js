/*==========================================================
    Explore Brasil
    favoritos.js
==========================================================*/

/*==========================================================
    Inicialização
==========================================================*/

window.addEventListener("load", () => {

    protegerPagina();

    carregarFavoritos();

});

/*==========================================================
    Carregar favoritos
==========================================================*/

async function carregarFavoritos() {

    const usuario = getUsuarioCorrente();

    if (!usuario) {

        window.location.href = "login.html";

        return;

    }

    try {

        const resposta = await fetch(API.lugares);

        const lugares = await resposta.json();

        const favoritos = lugares.filter(lugar =>
            usuario.favoritos.includes(lugar.id)
        );

        mostrarFavoritos(favoritos);

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar favoritos.");

    }

}

/*==========================================================
    Mostrar favoritos
==========================================================*/

function mostrarFavoritos(lista) {

    const div = document.getElementById("listaFavoritos");

    div.innerHTML = "";

    if (lista.length === 0) {

        div.innerHTML = `

        <div class="col-12">

            <div class="alert alert-info text-center">

                <h4>

                    Você ainda não possui destinos favoritos.

                </h4>

                <a
                    href="index.html"
                    class="btn btn-success mt-3">

                    Explorar destinos

                </a>

            </div>

        </div>

        `;

        return;

    }

    lista.forEach(lugar => {

        div.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow">

                <img
                    src="${lugar.imagem}"
                    class="card-img-top"
                    style="height:220px; object-fit:cover;">

                <div class="card-body">

                    <h5>

                        ${lugar.nome}

                    </h5>

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

                        ⭐ ${lugar.avaliacao ?? "-"}

                    </p>

                    <div class="d-grid gap-2">

                        <a
                            href="detalhes.html?id=${lugar.id}"
                            class="btn btn-success">

                            Ver detalhes

                        </a>

                        <button
                            class="btn btn-danger"
                            onclick="removerFavorito('${lugar.id}')">

                            ❤️ Remover

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}

/*==========================================================
    Remover favorito
==========================================================*/

async function removerFavorito(idLugar) {

    const usuario = getUsuarioCorrente();

    if (!usuario) return;

    try {

        usuario.favoritos = usuario.favoritos.filter(

            id => id !== idLugar

        );

        await fetch(`${API_USUARIOS}/${usuario.id}`, {

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

        carregarFavoritos();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao remover favorito.");

    }

}