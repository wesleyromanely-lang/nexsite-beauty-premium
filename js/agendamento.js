import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Carregar serviços
async function carregarServicos() {

  const select = document.getElementById("servico");

  const snapshot = await getDocs(
    collection(db, "servicos")
  );

  snapshot.forEach((doc) => {

    const servico = doc.data();

    const option = document.createElement("option");

    option.value = servico.nome;
    option.textContent =
      `${servico.nome} - R$ ${servico.valor}`;

    select.appendChild(option);

  });

}

carregarServicos();


// Agendar
window.agendar = async function () {

  const nome =
    document.getElementById("nome").value;

  const telefone =
    document.getElementById("telefone").value;

  const servico =
    document.getElementById("servico").value;

  const data =
    document.getElementById("data").value;

  const horario =
    document.getElementById("horario").value;

  const mensagem =
    document.getElementById("mensagem");


  if (
    !nome ||
    !telefone ||
    !servico ||
    !data ||
    !horario
  ) {

    mensagem.innerHTML =
      "Preencha todos os campos.";

    return;

  }


  // Verificar horário ocupado
  const consulta = query(
    collection(db, "agendamentos"),
    where("data", "==", data),
    where("horario", "==", horario)
  );

  const resultado = await getDocs(consulta);


  if (!resultado.empty) {

    mensagem.innerHTML =
      "Este horário já está ocupado.";

    return;

  }


  // Salvar agendamento
  await addDoc(
    collection(db, "agendamentos"),
    {

      cliente: nome,
      telefone: telefone,
      servico: servico,
      data: data,
      horario: horario,
      status: "confirmado"

    }
  );


  mensagem.innerHTML =
    "Agendamento realizado com sucesso!";


  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("servico").value = "";
  document.getElementById("data").value = "";
  document.getElementById("horario").value = "";

};
