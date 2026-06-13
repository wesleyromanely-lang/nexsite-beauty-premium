import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


window.enviarContato = async function () {

  const nome = document
    .getElementById("nome")
    .value
    .trim();

  const telefone = document
    .getElementById("telefone")
    .value
    .trim();

  const mensagem = document
    .getElementById("mensagem");


  if (!nome || !telefone) {

    mensagem.innerHTML =
      "Preencha todos os campos.";

    return;

  }


  try {

    await addDoc(
      collection(db, "clientes"),
      {

        nome: nome,

        telefone: telefone,

        dataCadastro:
          new Date().toLocaleDateString(
            "pt-BR"
          )

      }
    );


    mensagem.innerHTML =
      "Obrigado! Em breve entraremos em contato.";


    document.getElementById("nome").value = "";

    document.getElementById("telefone").value = "";


  } catch (error) {

    console.error(error);

    mensagem.innerHTML =
      "Erro ao enviar. Tente novamente.";

  }

};
