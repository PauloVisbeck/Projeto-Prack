function guardar() {
  var razaosocial = document.getElementById("razaosocial").value;
  var cnpj = document.getElementById("cnpj").value;
  var email = document.getElementById("email").value;
  var fone = document.getElementById("fone").value;
  var segmento = document.getElementById("segmento").value;
  var inscestadual = document.getElementById("inscEstadual").value;
  sessionStorage.setItem("razaosocialE", razaosocial);
  sessionStorage.setItem("cnpjE", cnpj);
  sessionStorage.setItem("emailE", email);
  sessionStorage.setItem("foneE", fone);
  sessionStorage.setItem("segmentoE", segmento);
  sessionStorage.setItem("inscestadualE", inscestadual);
}
function get() {
  document.getElementById("tablempresa").innerHTML = "";
  fetch("https://localhost:7165/api/Empresas")
    .then((dados) => dados.json())
    .then((resposta) =>
      resposta.forEach((element) => {
        var status;
        if (element.status == true) {
          status = "Ativo";
        } else {
          status = "Desativado";
        }
        document.getElementById("tablempresa").innerHTML += `
        <tr>
        <td>${element.razaoSocial}</td>
        <td>${element.cnpj}</td>
        <td>${element.fone}</td>
        <td>${element.email}</td>
        <td>${element.cep}</td>
        <td>${element.rua}</td>
        <td>${element.numero}</td>
        <td>${status}</td>
        <td>
        <button class="excluir" onclick="deletar(${element.id})" title="Apagar">
            <img src="../img/icon-lixeira.png" alt="Ícone de lixeira" />
        </button>
        <button class="detalhes" onclick="abrirDetalhesEmpresa(${element.id})" title="Detalhes"> 
            <img src="../img/icon-details.png" alt="Ícone de detalhes"/>
        </button>
        <button class="editar" onclick="alterar(${element.id})"title="Editar">
        <img src="../img/icon-edit.png" alt="Ícone de edição" />
        </button>
        </td>
        </tr>
    `;
      })
    );
}

function post() {
  var razaoSocial = sessionStorage.getItem("razaosocialE");
  var cnpj = sessionStorage.getItem("cnpjE");
  var email = sessionStorage.getItem("emailE");
  var fone = sessionStorage.getItem("foneE");
  var segmento = sessionStorage.getItem("segmentoE");
  var inscestadual = sessionStorage.getItem("inscestadualE");
  var cep = document.getElementById("cep").value;
  var rua = document.getElementById("rua").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var cidade = document.getElementById("cidade").value;
  var estado = document.getElementById("estado").value;

  var empresa = {
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
    status: true,
  };
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empresa),
  };
  fetch("https://localhost:7165/api/Empresas", option)
    .then(() => {
      abrirMensagem();
      sessionStorage.clear();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar loja:", error);
    });
}

function deletar(id) {
  fetch(`https://localhost:7165/api/Empresas/${id}`, { method: "Delete" });
}

function alterar(id) {
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

  var empresa = {
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
  };

  const option = {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empresa),
  };
  fetch(`https://localhost:7165/api/Empresas/${id}`, option);
}

function abrirDetalhesEmpresa(id) {
  const detalhe = document.getElementById("janela-detalhes");
  detalhe.classList.add("abrir");

  fetch(`https://localhost:7165/api/Empresas/${id}`)
    .then((response) => response.json())
    .then((detalhes) => {
      sessionStorage.setItem("razaosocialE", detalhes.razaoSocial);
      sessionStorage.setItem("cnpjE", detalhes.cnpj);
      sessionStorage.setItem("emailE", detalhes.email);
      sessionStorage.setItem("foneE", detalhes.fone);
      sessionStorage.setItem("inscestadualE", detalhes.inscEstadual);
      sessionStorage.setItem("cepE", detalhes.cep);
      sessionStorage.setItem("bairroE", detalhes.cep);
      sessionStorage.setItem("ruaE", detalhes.rua);
      sessionStorage.setItem("cidadeE", detalhes.cidade);
      sessionStorage.setItem("numeroE", detalhes.numero);
      sessionStorage.setItem("estadoE", detalhes.estado);

      document.getElementById("razaoSocial").value = detalhes.razaoSocial;
      document.getElementById("cnpj").value = detalhes.cnpj;
      document.getElementById("email").value = detalhes.email;
      document.getElementById("fone").value = detalhes.fone;
      document.getElementById("inscEstadual").value = detalhes.inscEstadual;
      document.getElementById("cep").value = detalhes.cep;
      document.getElementById("bairro").value = detalhes.bairro;
      document.getElementById("rua").value = detalhes.rua;
      document.getElementById("cidade").value = detalhes.cidade;
      document.getElementById("numero").value = detalhes.numero;
      document.getElementById("estado").value = detalhes.estado;

      detalhe.addEventListener("click", (d) => {
        if (d.target.id == "fechar" || d.target.id == "janela-detalhes") {
          detalhe.classList.remove("abrir");
        }
      });
    });
}
