import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Dashboard
async function carregarClientes() {

  const tbody =
    document.getElementById(
      "listaClientes"
    );

  tbody.innerHTML = "";

  try {

    const snapshot = await getDocs(
      collection(db, "clientes")
    );


    document.getElementById(
      "totalClientes"
    ).textContent = snapshot.size;


    snapshot.forEach((item) => {

      const cliente = item.data();

      const telefone =
        cliente.telefone.replace(
          /\D/g,
          ""
        );

      tbody.innerHTML += `

      <tr>

        <td>${cliente.nome}</td>

        <td>${cliente.telefone}</td>

        <td>

          <a
            href="https://wa.me/55${telefone}"
            target="_blank">

            <button class="btn-acao">

              WhatsApp

            </button>

          </a>

        </td>

      </tr>

      `;

    });

  } catch (error) {

    console.error(error);

  }

}


// Logout
document
.getElementById("btnSair")
.addEventListener(
  "click",
  async () => {

    await signOut(auth);

    window.location.href =
      "login.html";

  }
);


carregarClientes();
