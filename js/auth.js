import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword,

onAuthStateChanged,

signOut

} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
// Protege o Dashboard
if (window.location.pathname.includes("app.html")) {

    onAuthStateChanged(auth, (user) => {

        console.log("Usuário:", user);

        if (!user) {
            alert("NÃO LOGADO");
            window.location.href = "../pages/login.html";
        } else {
            alert("LOGADO: " + user.email);
        }

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

window.location="app.html";

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
