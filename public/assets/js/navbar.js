/*=====================================================
        NAVBAR DINÂMICA
======================================================*/

window.addEventListener("load", montarNavbar);

function montarNavbar() {

    const menu = document.getElementById("menuUsuario");

    if (!menu) return;

    const usuario = JSON.parse(

        sessionStorage.getItem("usuarioCorrente")

    );

    // Usuário não logado

    if (!usuario) {

        menu.innerHTML = `

            <li class="nav-item">

                <a class="nav-link"

                    href="login.html">

                    <i class="bi bi-box-arrow-in-right"></i>

                    Login

                </a>

            </li>

        `;

        return;

    }

    // Usuário logado

    menu.innerHTML = `

        <li class="nav-item">

            <span class="nav-link">

                <i class="bi bi-person-circle"></i>

                ${usuario.nome}

            </span>

        </li>

        <li class="nav-item">

            <a class="nav-link"

                href="favoritos.html">

                <i class="bi bi-star-fill"></i>

                Favoritos

            </a>

        </li>

    `;

    // Apenas administrador

    if (usuario.admin) {

        menu.innerHTML += `

            <li class="nav-item">

                <a class="nav-link"

                    href="cadastro-itens.html">

                    <i class="bi bi-pencil-square"></i>

                    Cadastro

                </a>

            </li>

        `;

    }

    // Logout

    menu.innerHTML += `

        <li class="nav-item">

            <a class="nav-link"

                href="#"

                onclick="logoutUser()">

                <i class="bi bi-box-arrow-right"></i>

                Sair

            </a>

        </li>

    `;

}