import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const adminEmail = "admin@isatrader.com";

// Protege apenas o app.html
if (window.location.pathname.endsWith("/pages/app.html")) {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        if (user.email !== adminEmail) {
            alert("Acesso negado.");
            await signOut(auth);
            window.location.href = "login.html";
            return;
        }

        console.log("Administrador autenticado:", user.email);
        const userName = document.getElementById("userName");

if (userName) {
    userName.innerHTML = "👤 " + user.email;
}

    });

}

// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            await signInWithEmailAndPassword(auth, email, password);

            window.location.href = "app.html";

        } catch (error) {

            alert(error.message);

        }

    });

}

// Logout
window.logout = async () => {

    await signOut(auth);

    window.location.href = "login.html";

};
