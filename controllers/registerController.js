document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form-register");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");

    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;

    const result = AuthController.register(name, email, password);

    alert(result.message);

    if (result.success) {
      window.location.href = "login.html";
    }
  });

});