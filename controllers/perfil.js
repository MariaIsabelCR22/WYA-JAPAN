// ==========================================
// PERFIL DE USUARIO WYA JAPAN
// ==========================================


// ------------------------------------------
// OBTENER USUARIO ACTIVO
// ------------------------------------------

const usuarioActivo = JSON.parse(
    localStorage.getItem("wyaUsuarioActivo")
);


// ------------------------------------------
// PROTEGER LA PÁGINA
// ------------------------------------------

if (!usuarioActivo) {

    alert(
        "Debes iniciar sesión para ver tu perfil."
    );

    window.location.href = "login.html";

}


// ------------------------------------------
// MOSTRAR INFORMACIÓN
// ------------------------------------------

else {

    const nombre =
        document.getElementById(
            "profile-name"
        );

    const email =
        document.getElementById(
            "profile-email"
        );

    const telefono =
        document.getElementById(
            "profile-phone"
        );


    if (nombre) {

        nombre.textContent =
            usuarioActivo.nombre ||
            "No disponible";

    }


    if (email) {

        email.textContent =
            usuarioActivo.email ||
            "No disponible";

    }


    if (telefono) {

        telefono.textContent =
            usuarioActivo.telefono ||
            "No disponible";

    }


    // --------------------------------------
    // MOSTRAR CARRITO EN MIS PEDIDOS
    // --------------------------------------

    mostrarPedidos();

}


// ==========================================
// MOSTRAR PEDIDOS / CARRITO
// ==========================================

function mostrarPedidos() {

    const noOrders =
        document.getElementById(
            "no-orders"
        );


    if (!noOrders) {
        return;
    }


    // --------------------------------------
    // OBTENER CARRITO DEL USUARIO
    // --------------------------------------

    const identificador =
        usuarioActivo.id ||
        usuarioActivo.email;


    const claveCarrito =
        `wyaCarrito_${identificador}`;


    const carrito =
        JSON.parse(
            localStorage.getItem(
                claveCarrito
            )
        ) || [];


    // --------------------------------------
    // SI NO HAY PRODUCTOS
    // --------------------------------------

    if (carrito.length === 0) {

        noOrders.innerHTML = `

            <div class="no-orders-icon">

                <img 
                    src="../images/icon-flor.png"
                    alt=""
                >

            </div>

            <h3>
                AÚN NO TIENES PEDIDOS
            </h3>

            <p>
                Cuando agregues productos a tu carrito,
                aquí podrás consultarlos.
            </p>

            <a
                href="prendas.html"
                class="profile-shop-btn"
            >
                VER PRENDAS
            </a>

        `;

        return;

    }


    // --------------------------------------
    // CALCULAR TOTAL
    // --------------------------------------

    let total = 0;


    carrito.forEach(producto => {

        total +=
            Number(producto.precio) *
            Number(producto.cantidad);

    });


    // --------------------------------------
    // CREAR PEDIDOS
    // --------------------------------------

    noOrders.innerHTML = `

        <div class="orders-list">

            ${carrito.map(producto => `

                <div class="order-card">

                    <div class="order-product">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                        >

                        <div class="order-product-info">

                            <h3>
                                ${producto.nombre}
                            </h3>

                            <p>
                                CANTIDAD:
                                ${producto.cantidad}
                            </p>

                            <p>
                                PRECIO:
                                $${Number(producto.precio)
                                    .toLocaleString("es-CO")}
                            </p>

                        </div>

                        <div class="order-product-price">

                            $${(
                                Number(producto.precio) *
                                Number(producto.cantidad)
                            ).toLocaleString("es-CO")}

                        </div>

                    </div>

                </div>

            `).join("")}

        </div>


        <div class="order-total">

            <span>
                TOTAL
            </span>

            <strong>
                $${total.toLocaleString("es-CO")}
            </strong>

        </div>

    `;

}