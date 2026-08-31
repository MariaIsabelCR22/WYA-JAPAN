document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".catalog-add-btn");

  const isLogged = localStorage.getItem("sessionUser");

  buttons.forEach(btn => {

    if (!isLogged) {
      btn.disabled = true;
      btn.textContent = "INICIA SESIÓN PARA COMPRAR";
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }

    btn.addEventListener("click", () => {

      if (!isLogged) {
        alert("Debes iniciar sesión primero");
        return;
      }

      alert("Producto agregado al carrito 🛒");
      // aquí luego metemos carrito real
    });

  });

});

document.addEventListener("DOMContentLoaded", () => {

  const isLogged = localStorage.getItem("sessionUser");

  const loginMsg = document.getElementById("cart-login-msg");
  const cartBox = document.getElementById("cart-logged");
  const cartItems = document.getElementById("cart-items");

  const buttons = document.querySelectorAll(".btn-quick-add, .catalog-add-btn");

  // 🔥 CAMBIO DE VISTA SEGÚN LOGIN
  if (isLogged) {
    loginMsg.style.display = "none";
    cartBox.style.display = "block";
    renderCart();
  } else {
    loginMsg.style.display = "block";
    cartBox.style.display = "none";
  }

  // 🛒 AGREGAR PRODUCTOS
  buttons.forEach(btn => {

    btn.addEventListener("click", () => {

      if (!isLogged) return;

      const productCard = btn.closest(".product-card, .catalog-card");

      const name = productCard.querySelector("h3").textContent;
      const price = productCard.querySelector(".product-price, .catalog-price").textContent;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push({ name, price });

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();

    });

  });

  // 🧠 MOSTRAR CARRITO
  function renderCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    cart.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${item.name}</p>
        <small>${item.price}</small>
        <hr>
      `;
      cartItems.appendChild(div);
    });

  }

});