import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword,

onAuthStateChanged,

signOut

} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
// Protege o Dashboard
if (window.location.pathname.includes("app.html")) {

    onAuthStateChanged(auth, async (user) => {

        console.log("Usuário:", user);

       if (!user) {
    window.location.href = "../login.html";
    return;
}

const adminEmail = "admin@isatrader.com";

if (user.email !== adminEmail) {
    alert("Acesso negado.");
    await signOut(auth);
    window.location.href = "../pages/login.html";
    return;
}

console.log("Administrador autenticado:", user.email);

    });

}
const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

try{

await signInWithEmailAndPassword(auth,email,password);

window.location.href = "app.html";

}catch(error){

alert(error.message);

}

});

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Usuário logado:",user.email);

}else{

console.log("Nenhum usuário logado.");

}

});

window.logout=async()=>{

await signOut(auth);

window.location="../login.html";

};

}
