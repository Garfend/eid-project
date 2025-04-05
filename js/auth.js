function generateToken() {
  return "token-" + Math.random().toString(36).substr(2, 16);
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

function registerUser(name, email, password) {
  const users = getUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) return false;

  const user = {
    id: Date.now(),
    name,
    email,
    password,
    token: generateToken(),
    cart: [],
  };

  users.push(user);
  saveUsers(users);
  setCurrentUser(user);
  return true;
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return false;

  user.token = generateToken();
  saveUsers(users);
  setCurrentUser(user);
  return true;
}

function logoutUser() {
  const users = getUsers();
  const current = getCurrentUser();
  const updatedUsers = users.map((user) => {
    if (user.id === current.id) {
      return { ...user, token: null };
    }
    return user;
  });
  saveUsers(updatedUsers);
  clearCurrentUser();
}

function isAuthenticated() {
  const user = getCurrentUser();
  return user && user.token;
}

function protectRoute(redirectTo = "login.html") {
  if (!isAuthenticated()) {
    window.location.href = redirectTo;
  }
}

(function getCartLength() {
  const user = getCurrentUser();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!user) return 0;
  console.log("user", cart.length);
  var cartNumber = document.querySelector("#cart-number");
  if (cartNumber) {
    cartNumber.innerHTML = `Cart (${cart.length})`;
  }
  return cart.length;
})();
