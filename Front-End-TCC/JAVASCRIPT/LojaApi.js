function getTokenValores() {
  var token = localStorage.getItem("token");
  if (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}

function guardar() {
  var razaosocial = document.getElementById("razaosocial").value;
  var cnpj = document.getElementById("cnpj").value;
  var email = document.getElementById("email").value;
  var fone = document.getElementById("fone").value;
  var segmento = document.getElementById("segmento").value;
  var inscestadual = document.getElementById("inscEstadual").value;
  sessionStorage.setItem("razaosocialL", razaosocial);
  sessionStorage.setItem("cnpjL", cnpj);
  sessionStorage.setItem("emailL", email);
  sessionStorage.setItem("foneL", fone);
  sessionStorage.setItem("segmentoL", segmento);
  sessionStorage.setItem("inscestadualL", inscestadual);
}
function get() {
  var token = localStorage.getItem("token");
  var valoresDoToken = getTokenValores();
  console.log(valoresDoToken);
  document.getElementById("tableloja").innerHTML = "";
  if (valoresDoToken.role == "Representante") {
    fetch(`https://localhost:7165/api/Lojas/${Number(valoresDoToken.nameid)}`)
      .then((dados) => dados.json())
      .then((resposta) =>
        resposta.forEach((element) => {
          var status;
          if (element.status == true) {
            status = "Ativo";
          } else {
            status = "Desativado";
          }
          document.getElementById("tableloja").innerHTML += `
        <tr>
        <td>${element.razaoSocial}</td>
        <td>${element.cnpj}</td>
        <td>${element.fone}</td>
        <td>${element.email}</td>
        <td>${element.cep}</td>
        <td>${element.segmento}</td>
        <td>${status}</td>
        <td>
        <button class="excluir" onclick="deletar(${element.id})" title="Apagar">
        <img src="../img/icon-lixeira.png" alt="Ícone de lixeira" />
        </button>
        <button class="detalhes" onclick="getID(${element.id})" title="Detalhes"> 
        <img src="../img/icon-details.png" alt="Ícone de detalhes"/>
        </button>
        <button class="editar" onclick="alterar(${element.id})"title="Editar">
        <img src="../img/icon-edit.png" alt="Ícone de edição" />
        </button>
        <button class="alerta" onclick="definirAlertaLojas(${element.id})"title="Definir Alerta">
        <img src="../img/icon-alert.png" alt="Ícone de alerta" />
        </button>
        <td>
        </tr>
    `;
        })
      );
  } else {
    fetch(`https://localhost:7165/api/Lojas`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((dados) => dados.json())
      .then((resposta) =>
        resposta.forEach((element) => {
          var status;
          if (element.status == true) {
            status = "Ativo";
          } else {
            status = "Desativado";
          }
          document.getElementById("tableloja").innerHTML += `
            <tr>
            <td>${element.razaoSocial}</td>
            <td>${element.cnpj}</td>
            <td>${element.fone}</td>
            <td>${element.email}</td>
            <td>${element.cep}</td>
            <td>${element.segmento}</td>
            <td>${status}</td>
            <td>
            <button class="excluir" onclick="deletar(${element.id})" title="Apagar">
            <img src="../img/icon-lixeira.png" alt="Ícone de lixeira" />
            </button>
            <button class="detalhes" onclick="abrirDetalhesLoja(${element.id})" title="Detalhes"> 
            <img src="../img/icon-details.png" alt="Ícone de detalhes"/>
            </button>
            <button class="editar" onclick="alterar(${element.id})"title="Editar">
            <img src="../img/icon-edit.png" alt="Ícone de edição" />
            </button>
            <button class="alerta" onclick="definirAlertaLojas(${element.id})"title="Definir Alerta">
            <img src="../img/icon-alert.png" alt="Ícone de alerta" />
            </button>
            <td>
            </tr>
        `;
        })
      );
  }
}

function post() {
  var valoresDoToken = getTokenValores();
  var razaoSocial = sessionStorage.getItem("razaosocialL");
  var cnpj = sessionStorage.getItem("cnpjL");
  var email = sessionStorage.getItem("emailL");
  var fone = sessionStorage.getItem("foneL");
  var segmento = sessionStorage.getItem("segmentoL");
  var inscestadual = sessionStorage.getItem("inscestadualL");
  var cep = document.getElementById("cep").value;
  var rua = document.getElementById("rua").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var cidade = document.getElementById("cidade").value;
  var estado = document.getElementById("estado").value;

  var loja = {
    razaosocial: razaoSocial,
    cnpj: cnpj,
    email: email,
    fone: fone,
    segmento: segmento,
    inscestadual: inscestadual,
    cep: cep,
    rua: rua,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    representanteid: Number(valoresDoToken.nameid),
    status: true,
  };
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loja),
  };
  fetch("https://localhost:7165/api/Lojas", option)
    .then(() => {
      abrirMensagem();
      sessionStorage.clear();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar loja:", error);
    });
}

function deletar(id) {
  fetch(`https://localhost:7165/api/Lojas/${id}`, { method: "Delete" });
}

function alterar(id) {
  var valoresDoToken = getTokenValores();
  var razaoSocial = document.getElementById("razaoSocial").value;
  var cnpj = document.getElementById("cnpj").value;
  var email = document.getElementById("email").value;
  var cep = document.getElementById("cep").value;
  var fone = document.getElementById("fone").value;
  var status = true;
  var rua = document.getElementById("rua").value;
  var numero = document.getElementById("numero").value;
  var segmento = document.getElementById("segmento").value;
  var inscestadual = document.getElementById("inscEstadual").value;
  var bairro = document.getElementById("bairro").value;
  var cidade = document.getElementById("cidade").value;

  var loja = {
    id: id,
    razaoSocial: razaoSocial,
    cnpj: cnpj,
    email: email,
    cep: cep,
    fone: fone,
    status: status,
    rua: rua,
    numero: numero,
    segmento: segmento,
    inscestadual: inscestadual,
    bairro: bairro,
    cidade: cidade,
    representanteid: Number(valoresDoToken.nameid),
  };

  const option = {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loja),
  };
  fetch(`https://localhost:7165/api/Lojas/${id}`, option);
}

function abrirDetalhesLoja(id) {
  const detalhe = document.getElementById("janela-detalhes");
  detalhe.classList.add("abrir");

  fetch(`https://localhost:7165/api/Lojas/getDetalhes${id}`)
    .then((response) => response.json())
    .then((detalhes) => {
      console.log("Detalhes da loja recebidos:", detalhes);

      const detalhesLoja = Array.isArray(detalhes) ? detalhes[0] : detalhes;

      sessionStorage.setItem("razaosocialL", detalhesLoja.razaoSocial);
      sessionStorage.setItem("cnpjL", detalhesLoja.cnpj);
      sessionStorage.setItem("emailL", detalhesLoja.email);
      sessionStorage.setItem("foneL", detalhesLoja.fone);
      sessionStorage.setItem("inscestadualL", detalhesLoja.inscEstadual);
      sessionStorage.setItem("cepL", detalhesLoja.cep);
      sessionStorage.setItem("bairroL", detalhesLoja.cep);
      sessionStorage.setItem("ruaL", detalhesLoja.rua);
      sessionStorage.setItem("cidadeL", detalhesLoja.cidade);
      sessionStorage.setItem("numeroL", detalhesLoja.numero);
      sessionStorage.setItem("estadoL", detalhesLoja.estado);

      document.getElementById("razaoSocial").value = detalhesLoja.razaoSocial;
      document.getElementById("cnpj").value = detalhesLoja.cnpj;
      document.getElementById("email").value = detalhesLoja.email;
      document.getElementById("fone").value = detalhesLoja.fone;
      document.getElementById("inscEstadual").value = detalhesLoja.inscEstadual;
      document.getElementById("cep").value = detalhesLoja.cep;
      document.getElementById("bairro").value = detalhesLoja.bairro;
      document.getElementById("rua").value = detalhesLoja.rua;
      document.getElementById("cidade").value = detalhesLoja.cidade;
      document.getElementById("numero").value = detalhesLoja.numero;
      document.getElementById("estado").value = detalhesLoja.estado;

      detalhe.addEventListener("click", (d) => {
        if (d.target.id == "fechar" || d.target.id == "janela-detalhes") {
          detalhe.classList.remove("abrir");
        }
      });
    });
}