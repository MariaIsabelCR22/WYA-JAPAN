const UserModel = {
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getSession() {
    return localStorage.getItem("sessionUser");
  },

  setSession(email) {
    localStorage.setItem("sessionUser", email);
  },

  logout() {
    localStorage.removeItem("sessionUser");
  }
};

isLogged() {
  return localStorage.getItem("sessionUser") !== null;
}