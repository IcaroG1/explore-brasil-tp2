/*==========================================================
    Explore Brasil
    navbar.js

    Responsável por montar o menu de navegação
    conforme o usuário logado.
==========================================================*/

window.addEventListener("load", montarNavbar);

/*==========================================================
    Monta a Navbar
==========================================================*/

function montarNavbar() {

    const menu = document.getElementById("menuUsuario");

    if (!menu) return;

    const usuario = getUsuarioCorrente();

    /*-------------------------
        Usuário NÃO logado
    -------------------------*/

    if (!usuario) {

        menu.innerHTML = `

            <li class="nav-item">

                <a class="nav-link" href="index.html">

                    <i class="bi bi-house"></i>

                    Home

                </a>

            </li>

            <li class="nav-item">

                <a class="nav-link" href="login.html">

                    <i class="bi bi-box-arrow-in-right"></i>

                    Login

                </a>

            </li>

            <li class="nav-item">

                <a class="nav-link" href="cadastro.html">

                    <i class="bi bi-person-plus"></i>

                    Cadastro

                </a>

            </li>

        `;

        return;

    }

    /*-------------------------
        Usuário logado
    -------------------------*/

    let menuAdmin = "";

    if (usuario.admin) {

        menuAdmin = `

            <li class="nav-item">

                <a class="nav-link"
                    href="cadastro-itens.html">

                    <i class="bi bi-pencil-square"></i>

                    Cadastro de Destinos

                </a>

            </li>

        `;

    }

    menu.innerHTML = `

        <li class="nav-item">

            <a class="nav-link"
                href="index.html">

                <i class="bi bi-house"></i>

                Home

            </a>

        </li>

        <li class="nav-item">

            <a class="nav-link"
                href="favoritos.html">

                <i class="bi bi-heart-fill"></i>

                Favoritos

            </a>

        </li>

        ${menuAdmin}

        <li class="nav-item">

            <span class="nav-link">

                <i class="bi bi-person-circle"></i>

                Olá, ${usuario.nome}

            </span>

        </li>

        <li class="nav-item">

            <a
                href="#"
                class="nav-link text-warning"
                onclick="logoutUser()">

                <i class="bi bi-box-arrow-right"></i>

                Sair

            </a>

        </li>

    `;

}