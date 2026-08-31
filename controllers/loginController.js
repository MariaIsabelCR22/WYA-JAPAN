document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form-login");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");

    const email = inputs[0].value;
    const password = inputs[1].value;

    const result = AuthController.login(email, password);

    alert(result.message);

    if (result.success) {
      window.location.href = "../../index.html";
    }
  });

});