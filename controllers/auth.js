// sistema de autenticacion

// obtener los usuarios guardados
let usuarios = JSON.parse(localStorage.getItem("wyaUsuarios")) || [];

// registro
const formularioRegistro = document.getElementById("form-register");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function (event) {

        event.preventDefault();

        const nombre = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim().toLowerCase();
        const telefono = document.getElementById("register-phone").value.trim();
        const password = document.getElementById("register-password").value;

        // verificar si el correo ya existe
        const usuarioExistente = usuarios.find(
            usuario => usuario.email === email
        );

        if (usuarioExistente) {

            alert("Este correo ya está registrado.");

            return;
        }

        // crear el nuevo usuario
        const nuevoUsuario = {
            id: Date.now(),
            nombre: nombre,
            email: email,
            telefono: telefono,
            password: password
        };

        // guardar el usuario
        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            "wyaUsuarios",
            JSON.stringify(usuarios)
        );

        alert("¡Cuenta creada correctamente! ✦");

        // ir al login
        window.location.href = "login.html";

    });
}

// inicio de sesion
const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;


        // buscar el usuario
        const usuario = usuarios.find(
            usuario =>
                usuario.email === email &&
                usuario.password === password
        );

        // verificar si existe
        if (!usuario) {

            alert("El correo o la contraseña son incorrectos.");

            return;
        }

        // guardar el usuario activo
        localStorage.setItem(
            "wyaUsuarioActivo",
            JSON.stringify(usuario)
        );

        alert(`¡Bienvenido/a, ${usuario.nombre}! ✦`);

        // volver al inicio
        window.location.href = "../../index.html";

    });
}

// actualizar el menu del usuario
function actualizarMenuUsuario() {

    const dropdown = document.querySelector(".user-dropdown");

    if (!dropdown) {
        return;
    }

    const usuarioActivo = JSON.parse(
        localStorage.getItem("wyaUsuarioActivo")
    );

    // si el usuario inicio sesion
    if (usuarioActivo) {

        const rutaPerfil = window.location.pathname.includes("/views/pages/")
            ? "perfil.html"
            : "views/pages/perfil.html";

        dropdown.innerHTML = `
            <a href="${rutaPerfil}">✦ MI PERFIL ✦</a>

            <a href="#" id="logout-btn">
                ✦ CERRAR SESIÓN ✦
            </a>
        `;

        const botonCerrarSesion =
            document.getElementById("logout-btn");


        botonCerrarSesion.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                cerrarSesion();

            }
        );

    }

    // si no hay una sesion iniciada
    else {

        const rutaLogin = window.location.pathname.includes("/views/pages/")
            ? "login.html"
            : "views/pages/login.html";

        const rutaRegister = window.location.pathname.includes("/views/pages/")
            ? "register.html"
            : "views/pages/register.html";

        dropdown.innerHTML = `
            <a href="${rutaLogin}">✦ INICIA SESIÓN ✦</a>

            <a href="${rutaRegister}">✦ REGÍSTRATE ✦</a>
        `;

    }

}

// cerrar sesion
function cerrarSesion() {

    localStorage.removeItem("wyaUsuarioActivo");

    alert("Has cerrado sesión correctamente. ✦");

    window.location.href = "../../index.html";

}

// ejecutar al cargar la pagina
actualizarMenuUsuario();