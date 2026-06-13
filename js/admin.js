import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function carregarDados() {

  try {

    // Serviços
    const servicosSnapshot = await getDocs(
      collection(db, "servicos")
    );

    document.getElementById("totalServicos").textContent =
      servicosSnapshot.size;


    // Clientes
    const clientesSnapshot = await getDocs(
      collection(db, "clientes")
    );

    document.getElementById("totalClientes").textContent =
      clientesSnapshot.size;


    // Agendamentos
    const agendamentosSnapshot = await getDocs(
      collection(db, "agendamentos")
    );

    document.getElementById("totalAgendamentos").textContent =
      agendamentosSnapshot.size;

  } catch (error) {

    console.error("Erro ao carregar dados:", error);

  }

}

carregarDados();
