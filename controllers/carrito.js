// Elementos del carrito
const cartToggle = document.getElementById("cart-toggle");
const cartSidebar = document.querySelector(".cart-sidebar");

// Obtener el usuario que inicio sesion
function obtenerUsuarioActivo() {

    return JSON.parse(
        localStorage.getItem("wyaUsuarioActivo")
    );

}
// Crear la clave del carrito para cada usuario
function obtenerClaveCarrito() {

    const usuario = obtenerUsuarioActivo();

    if (!usuario) {
        return null;
    }
    // Usa el id del usuario para guardar su carrito
    const identificador =
        usuario.id || usuario.email;

    return `wyaCarrito_${identificador}`;

}
// Obtener los productos guardados
function obtenerCarrito() {

    const clave = obtenerClaveCarrito();

    if (!clave) {
        return [];
    }

    return JSON.parse(
        localStorage.getItem(clave)
    ) || [];

}
// Guardar los productos en localStorage
function guardarCarrito(carrito) {

    const clave = obtenerClaveCarrito();

    if (!clave) {
        return;
    }

    localStorage.setItem(
        clave,
        JSON.stringify(carrito)
    );

}
// Mostrar el carrito
function mostrarCarrito() {

    if (!cartSidebar) {
        return;
    }

    const usuario = obtenerUsuarioActivo();

    const contenido =
        cartSidebar.querySelector(
            ".cart-sidebar-content"
        );

    if (!contenido) {
        return;
    }
    // Mostrar mensaje si no hay una cuenta iniciada
    if (!usuario) {
        contenido.innerHTML = `

            <div class="cart-sidebar-icon">
                <img src="../images/icon-flor.png" alt="">
            </div>

            <h3>TU CARRITO ESTÁ VACÍO</h3>

            <p class="cart-sidebar-msg">
                Solo puedes agregar cosas o ver tus cosas del carrito
                si tienes una cuenta.
                <br><br>

                Por favor:
                <a href="login.html" class="cart-auth-link">
                    INICIA SESIÓN
                </a>
                o
                <a href="register.html" class="cart-auth-link">
                    REGÍSTRATE
                </a>.
            </p>

        `;
        return;
    }
    // Obtener el carrito del usuario
    const carrito = obtenerCarrito();
    // Mostrar mensaje si no hay productos
    if (carrito.length === 0) {
        contenido.innerHTML = `
            <div class="cart-sidebar-icon">
                <img src="./views/images/icon-flor.png" alt=""
            </div>

            <h3>TU CARRITO ESTÁ VACÍO</h3>

            <p class="cart-sidebar-msg">
                Aún no has agregado ningún producto a tu carrito.
            </p>
        `;
        return;
    }
    // Calcular el total y la cantidad de productos
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {

        total +=
            Number(producto.precio) *
            Number(producto.cantidad);

        cantidadTotal +=
            Number(producto.cantidad);

    });
    // Crear el contenido del carrito
    contenido.innerHTML = `
        <div class="cart-products-header">

            <h3>TU CARRITO</h3>

            <span>
                ${cantidadTotal}
                ${cantidadTotal === 1 ? "PRODUCTO" : "PRODUCTOS"}
            </span>

        </div>
        <div class="cart-products-list">
            ${carrito.map((producto, index) => `

                <div class="cart-product">

                    <img 
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="cart-product-img"
                    >

                    <div class="cart-product-info">

                        <h4>
                            ${producto.nombre}
                        </h4>

                        <p>
                            ${formatearPrecio(producto.precio)}
                        </p>

                        <div class="cart-product-controls">

                            <button 
                                class="cart-quantity-btn"
                                data-action="decrease"
                                data-index="${index}"
                            >
                                −
                            </button>

                            <span>
                                ${producto.cantidad}
                            </span>

                            <button 
                                class="cart-quantity-btn"
                                data-action="increase"
                                data-index="${index}"
                            >
                                +
                            </button>

                            <button
                                class="cart-remove-btn"
                                data-action="remove"
                                data-index="${index}"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
        <div class="cart-total">
            <span>TOTAL</span>
            <strong>
                ${formatearPrecio(total)}
            </strong>
        </div>
        <button class="cart-checkout-btn">
            IR A COMPRAR →
        </button>
    `;
    // Activar los botones del carrito
    agregarEventosCarrito();
}
// Dar formato al precio
function formatearPrecio(precio) {
    return `$${Number(precio).toLocaleString("es-CO")}`;
}
// Agregar un producto al carrito
function agregarAlCarrito(producto, cantidad) {
    const usuario = obtenerUsuarioActivo();
    // Verificar si hay una cuenta iniciada
    if (!usuario) {
        alert(
            "Debes iniciar sesión para agregar productos al carrito."
        );
        return;
    }
    // Verificar que la cantidad sea valida
    cantidad = Number(cantidad);
    if (
        !Number.isInteger(cantidad) ||
        cantidad < 1
    ) {
        alert(
            "La cantidad debe ser mínimo 1."
        );
        return;
    }
    // Obtener el carrito actual
    const carrito = obtenerCarrito();
    // Revisar si el producto ya existe
    const productoExistente =
        carrito.find(
            item => item.nombre === producto.nombre
        );
    // Si existe aumenta su cantidad
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    }
    // Si no existe lo agrega
    else {
        carrito.push({

            nombre: producto.nombre,

            precio: Number(producto.precio),

            imagen: producto.imagen,

            cantidad: cantidad

        });
    }
    // Guardar los cambios
    guardarCarrito(carrito);
    // Actualizar el carrito
    mostrarCarrito();
    // Abrir el carrito
    if (cartToggle) {
        cartToggle.checked = true;
    }
}
// Agregar productos desde el modal
function configurarBotonModalCarrito() {
    const botonModal =
        document.querySelector(".modal-add-btn");


    if (!botonModal) {
        return;
    }

    botonModal.addEventListener(
        "click",
        function () {

            const imagen =
                document.getElementById(
                    "modal-product-image"
                );

            const nombre =
                document.getElementById(
                    "modal-product-name"
                );

            const precio =
                document.getElementById(
                    "modal-product-price"
                );

            const cantidadInput =
                document.getElementById(
                    "product-quantity"
                );

            if (
                !imagen ||
                !nombre ||
                !precio ||
                !cantidadInput
            ) {
                return;
            }
            // Obtener la cantidad escrita
            const cantidad =
                Number(cantidadInput.value);
            // Verificar la cantidad
            if (
                !Number.isInteger(cantidad) ||
                cantidad < 1
            ) {
                alert(
                    "La cantidad debe ser mínimo 1."
                );
                cantidadInput.focus();
                return;
            }
            // Obtener el precio del producto
            const precioNumerico =
                Number(
                    precio.textContent
                        .replace(/[^\d]/g, "")
                );
            // Agregar el producto
            agregarAlCarrito({
                nombre:
                    nombre.textContent.trim(),

                precio:
                    precioNumerico,

                imagen:
                    imagen.src

            }, cantidad);
            // Volver la cantidad a 1
            cantidadInput.value = 1;
        }
    );
}
// Botones para cambiar la cantidad o eliminar
function agregarEventosCarrito() {

    const botones =
        document.querySelectorAll(
            ".cart-quantity-btn, .cart-remove-btn"
        );

    botones.forEach(boton => {

        boton.addEventListener(
            "click",
            function () {

                const carrito =
                    obtenerCarrito();

                const index =
                    Number(
                        this.dataset.index
                    );

                const accion =
                    this.dataset.action;

                if (!carrito[index]) {
                    return;
                }
                // Disminuir cantidad
                if (accion === "decrease") {
                    carrito[index].cantidad--;
                    if (
                        carrito[index].cantidad <= 0
                    ) {

                        carrito.splice(index, 1);
                    }
                }
                // Aumentar cantidad
                else if (
                    accion === "increase"
                ) {
                    carrito[index].cantidad++;
                }
                // Eliminar producto
                else if (
                    accion === "remove"
                ) {
                    carrito.splice(index, 1);
                }
                // Guardar y actualizar
                guardarCarrito(carrito);
                mostrarCarrito();
            }
        );
    });
}
// Cerrar el carrito con Escape
document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            cartToggle
        ) {
            cartToggle.checked = false;
        }
    }
);
// Ejecutar al cargar la pagina
mostrarCarrito();
configurarBotonModalCarrito();