const AuthController = {

  register(name, email, password) {
    const existing = UserModel.getUser();

    if (existing && existing.email === email) {
      return {
        success: false,
        message: "Ya existe una cuenta con este email"
      };
    }

    const user = { name, email, password };
    UserModel.saveUser(user);

    return {
      success: true,
      message: "Cuenta creada correctamente"
    };
  },

  login(email, password) {
    const user = UserModel.getUser();

    if (!user) {
      return {
        success: false,
        message: "No hay cuentas registradas"
      };
    }

    if (user.email === email && user.password === password) {
      UserModel.setSession(email);

      return {
        success: true,
        message: "Login correcto"
      };
    }

    return {
      success: false,
      message: "Credenciales incorrectas"
    };
  }
};

function showToast(message, success = true) {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.style.borderLeftColor = success ? "#ff2d78" : "#ff4d4d";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}