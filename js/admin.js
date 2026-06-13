import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Dashboard
async function carregarDados() {

  try {

    const servicosSnapshot = await getDocs(
      collection(db, "servicos")
    );

    document.getElementById(
      "totalServicos"
    ).textContent = servicosSnapshot.size;


    const clientesSnapshot = await getDocs(
      collection(db, "clientes")
    );

    document.getElementById(
      "totalClientes"
    ).textContent = clientesSnapshot.size;


    const agendamentosSnapshot = await getDocs(
      collection(db, "agendamentos")
    );

    document.getElementById(
      "totalAgendamentos"
    ).textContent = agendamentosSnapshot.size;

  } catch (error) {

    console.error(
      "Erro ao carregar dashboard:",
      error
    );

  }

}


// Lista de agendamentos
async function carregarAgendamentos() {

  const tbody =
    document.getElementById(
      "listaAgendamentos"
    );

  tbody.innerHTML = "";

  try {

    const snapshot = await getDocs(
      collection(db, "agendamentos")
    );

    snapshot.forEach((item) => {

      const agenda = item.data();

      tbody.innerHTML += `

      <tr>

        <td>${agenda.cliente}</td>

        <td>${agenda.telefone}</td>

        <td>${agenda.servico}</td>

        <td>${agenda.data}</td>

        <td>${agenda.horario}</td>

        <td>${agenda.status}</td>

        <td>

          <button
            class="btn-acao"
            onclick="marcarAtendido('${item.id}')">

            Atendido

          </button>

          <button
            class="btn-cancelar"
            onclick="cancelarAgenda('${item.id}')">

            Cancelar

          </button>

        </td>

      </tr>

      `;

    });

  } catch (error) {

    console.error(
      "Erro ao carregar agendamentos:",
      error
    );

  }

}


// Marcar como atendido
window.marcarAtendido = async function(id) {

  try {

    await updateDoc(
      doc(db, "agendamentos", id),
      {
        status: "atendido"
      }
    );

    carregarAgendamentos();

  } catch (error) {

    console.error(error);

  }

};


// Cancelar
window.cancelarAgenda = async function(id) {

  try {

    await updateDoc(
      doc(db, "agendamentos", id),
      {
        status: "cancelado"
      }
    );

    carregarAgendamentos();

  } catch (error) {

    console.error(error);

  }

};


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


carregarDados();
carregarAgendamentos();
