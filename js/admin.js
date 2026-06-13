import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Salvar Projeto
document
  .getElementById("btnSalvar")
  .addEventListener("click", salvarProjeto);


async function salvarProjeto() {

  const cliente =
    document.getElementById("cliente").value.trim();

  const telefone =
    document.getElementById("telefone").value.trim();

  const valor =
    Number(document.getElementById("valor").value);

  const observacoes =
    document.getElementById("observacoes").value.trim();

  if (!cliente || !telefone) {

    alert("Preencha nome e telefone.");

    return;

  }

  const hoje = new Date();

  const entrega = new Date();

  entrega.setDate(entrega.getDate() + 2);

  await addDoc(
    collection(db, "projetos"),
    {
      cliente,
      telefone,
      valor,
      dataVenda: hoje.toLocaleDateString("pt-BR"),
      prazoEntrega: entrega.toLocaleDateString("pt-BR"),
      status: "Em andamento",
      observacoes
    }
  );

  document.getElementById("cliente").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("valor").value = "180";
  document.getElementById("observacoes").value = "";

  carregarProjetos();

}


// Dashboard e Lista
async function carregarProjetos() {

  const snapshot =
    await getDocs(collection(db, "projetos"));

  const tbody =
    document.getElementById("listaProjetos");

  tbody.innerHTML = "";

  let faturamento = 0;

  let andamento = 0;

  let entregues = 0;

  let prazo = 0;


  snapshot.forEach((item) => {

    const projeto = item.data();

    faturamento += projeto.valor || 0;


    if (projeto.status === "Em andamento") {

      andamento++;

      prazo++;

    }


    if (projeto.status === "Entregue") {

      entregues++;

    }


    tbody.innerHTML += `

      <tr>

        <td>${projeto.cliente}</td>

        <td>${projeto.telefone}</td>

        <td>R$ ${projeto.valor}</td>

        <td>${projeto.dataVenda}</td>

        <td>${projeto.prazoEntrega}</td>

        <td>${projeto.status}</td>

        <td>

          <button
            class="btn-acao"
            onclick="entregarProjeto('${item.id}')">

            ✅ Entregue

          </button>

          <button
            class="btn-editar"
            onclick="editarProjeto('${item.id}')">

            ✏️ Editar

          </button>

          <button
            class="btn-cancelar"
            onclick="cancelarProjeto('${item.id}')">

            ❌ Cancelar

          </button>

          <button
            class="btn-excluir"
            onclick="excluirProjeto('${item.id}')">

            🗑️ Excluir

          </button>

        </td>

      </tr>

    `;

  });


  document.getElementById("faturamentoTotal")
    .textContent =
    `R$ ${faturamento.toFixed(2)}`;


  document.getElementById("projetosAndamento")
    .textContent =
    andamento;


  document.getElementById("projetosEntregues")
    .textContent =
    entregues;


  document.getElementById("projetosPrazo")
    .textContent =
    prazo;

}


// Entregue
window.entregarProjeto =
async function(id) {

  await updateDoc(

    doc(db, "projetos", id),

    {
      status: "Entregue"
    }

  );

  carregarProjetos();

};


// Editar Status
window.editarProjeto =
async function(id) {

  const novoStatus =
    prompt(
      "Digite o novo status:\n\nEm andamento\nEntregue\nCancelado\nAguardando informações"
    );

  if (!novoStatus) return;


  await updateDoc(

    doc(db, "projetos", id),

    {
      status: novoStatus
    }

  );

  carregarProjetos();

};


// Cancelar
window.cancelarProjeto =
async function(id) {

  const confirmar =
    confirm(
      "Deseja realmente cancelar este projeto?"
    );

  if (!confirmar) return;


  await updateDoc(

    doc(db, "projetos", id),

    {
      status: "Cancelado"
    }

  );

  carregarProjetos();

};


// Excluir
window.excluirProjeto =
async function(id) {

  const confirmar =
    confirm(
      "Deseja realmente excluir este projeto?"
    );

  if (!confirmar) return;


  await deleteDoc(

    doc(db, "projetos", id)

  );

  carregarProjetos();

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


carregarProjetos();
