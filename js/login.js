import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


window.entrar = async function(){

const email = document
.getElementById("email").value;

const senha = document
.getElementById("senha").value;


const mensagem = document
.getElementById("mensagem");


try {

await signInWithEmailAndPassword(
auth,
email,
senha
);


mensagem.innerHTML =
"Login realizado!";


setTimeout(()=>{

window.location.href="admin.html";

},1000);


} catch(error){

mensagem.innerHTML =
"Usuário ou senha incorretos";

console.log(error);

}


}
