let isRegistering = false;
const API_URL = "https://DEIN-BACKEND.onrender.com"; // später ersetzen

function toggleForm() {
  isRegistering = !isRegistering;
  document.getElementById("form-title").innerText = isRegistering ? "Registrieren" : "Anmelden";
  document.getElementById("toggle").innerText = isRegistering ? "Schon registriert? Anmelden" : "Noch kein Konto? Registrieren";
  document.getElementById("message").innerText = "";
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) return alert("Felder ausfüllen!");

  const endpoint = isRegistering ? "/register" : "/login";

  fetch(API_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("chat-container").style.display = "block";
      loadMessages();
    } else {
      document.getElementById("message").innerText = data.message;
    }
  });
}

function logout() {
  location.reload();
}

function sendMessage() {
  const msg = document.getElementById("message-input").value.trim();
  if (!msg) return;
  fetch(API_URL + "/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });
  document.getElementById("message-input").value = "";
  loadMessages();
}

function loadMessages() {
  fetch(API_URL + "/messages")
    .then(res => res.json())
    .then(data => {
      const chat = document.getElementById("chat-box");
      chat.innerHTML = data.messages.map(m => `<p><strong>${m.username}</strong>: ${m.message}</p>`).join("");
    });
}


