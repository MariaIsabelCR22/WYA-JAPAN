// ==========================================
// MODAL DE PRODUCTOS
// ==========================================


const productImages =
    document.querySelectorAll(".catalog-img");

const productButtons =
    document.querySelectorAll(".catalog-add-btn");


const productModal =
    document.getElementById("product-modal");


const modalProductImage =
    document.getElementById("modal-product-image");


const modalProductName =
    document.getElementById("modal-product-name");


const modalProductPrice =
    document.getElementById("modal-product-price");


const closeModal =
    document.getElementById("product-modal-close");


// ------------------------------------------
// ABRIR MODAL DESDE LA IMAGEN
// ------------------------------------------

productImages.forEach(image => {

    image.addEventListener("click", () => {

        modalProductImage.src =
            image.src;

        modalProductImage.alt =
            image.alt;

        modalProductName.textContent =
            image.dataset.product;

        modalProductPrice.textContent =
            image.dataset.price;

        productModal.classList.add("active");

    });

});


// ------------------------------------------
// ABRIR MODAL DESDE EL BOTÓN
// ------------------------------------------

productButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image =
            button.parentElement.querySelector(
                ".catalog-img"
            );


        if (!image) {
            return;
        }


        modalProductImage.src =
            image.src;

        modalProductImage.alt =
            image.alt;

        modalProductName.textContent =
            image.dataset.product;

        modalProductPrice.textContent =
            image.dataset.price;


        // Reiniciar cantidad

        const cantidad =
            document.getElementById(
                "product-quantity"
            );

        if (cantidad) {
            cantidad.value = 1;
        }


        productModal.classList.add("active");

    });

});


// ------------------------------------------
// CERRAR MODAL
// ------------------------------------------

if (closeModal) {

    closeModal.addEventListener(
        "click",
        () => {

            productModal.classList.remove(
                "active"
            );

        }
    );

}


// ------------------------------------------
// CERRAR AL HACER CLIC AFUERA
// ------------------------------------------

if (productModal) {

    productModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === productModal
            ) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ------------------------------------------
// ESCAPE
// ------------------------------------------

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            if (productModal) {

                productModal.classList.remove(
                    "active"
                );

            }

        }

    }
);