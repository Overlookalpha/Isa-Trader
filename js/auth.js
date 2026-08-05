import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword,

onAuthStateChanged,

signOut

} from "https://www.gstatic.com/firebasejs/12.7.1/firebase-auth.js";
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
