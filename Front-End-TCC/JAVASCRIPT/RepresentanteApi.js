function get() {
  document.getElementById("tablerepre").innerHTML = "";
  fetch("https://localhost:7165/api/Representantes")
    .then((dados) => dados.json())
    .then((resposta) =>
      resposta.forEach((element) => {
        var status;
        if (element.status == true) {
          status = "Ativo";
        } else {
          status = "Desativado";
        }
        document.getElementById("tablerepre").innerHTML += `
    <tr>
    <td>${element.razaoSocial}</td>
    <td>${element.cnpj}</td>
    <td>${element.fone}</td>
    <td>${element.email}</td>
    <td>${element.core}</td>
    <td>${element.cargo}</td>
    <td>${status}</td>
    <td>
    <button class="excluir" onclick="deletar(${element.id})" title="Apagar">
    <img src="../img/icon-lixeira.png" alt="Ícone de lixeira" />
    </button>
    <button class="detalhes" onclick="abrirDetalhesRepresentante(${element.id})" title="Detalhes"> 
    <img src="../img/icon-details.png" alt="Ícone de detalhes"/>
    </button>
    <button class="editar" onclick="alterar(${element.id})"title="Editar">
    <img src="../img/icon-edit.png" alt="Ícone de edição" />
    </button>
    </tr>
    `;
      })
    );
}

function post() {
  var razaosocial = document.getElementById("razaoSocial").value;
  var cnpj = document.getElementById("cnpj").value;
  var email = document.getElementById("email").value;
  var core = document.getElementById("core").value;
  var fone = document.getElementById("fone").value;
  var status = true;
  var senha = document.getElementById("Senha").value;
  var cargo = "Representante";

  var representante = {
    razaoSocial: razaosocial,
    cnpj: cnpj,
    email: email,
    core: core,
    fone: fone,
    status: status,
    senha: senha,
    cargo: cargo,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(representante),
  };
  fetch("https://localhost:7165/api/Representantes", option)
    .then(() => {
      abrirMensagem();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar representante:", error);
    });
}

function deletar(id) {
  fetch(`https://localhost:7165/api/Representantes/${id}`, {
    method: "Delete",
  });
}

function alterar(id) {
  var razaoSocial = document.getElementById("razaoSocial").value;
  var cnpj = document.getElementById("cnpj").value;
  var email = document.getElementById("email").value;
  var core = document.getElementById("core").value;
  var fone = document.getElementById("fone").value;
  var status = document.getElementById("status").value === "true";
  var senha = document.getElementById("senha").value;
  var cargo = document.getElementById("cargo").value;

  var representante = {
    id: id,
    RazaoSocial: razaoSocial,
    Cnpj: cnpj,
    Email: email,
    Core: core,
    Fone: fone,
    Status: status,
    Senha: senha,
    Cargo: cargo,
  };

  const option = {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(representante),
  };
  fetch(`https://localhost:7165/api/Representantes/${id}`, option);
}

function abrirDetalhesRepresentante(id) {
  const detalhe = document.getElementById("janela-detalhes");
  detalhe.classList.add("abrir");

  fetch(`https://localhost:7165/api/Representantes/${id}`)
    .then((response) => response.json())
    .then((detalhes) => {
      sessionStorage.setItem("razaosocialR", detalhes.razaoSocial);
      sessionStorage.setItem("cnpjR", detalhes.cnpj);
      sessionStorage.setItem("emailR", detalhes.email);
      sessionStorage.setItem("foneR", detalhes.fone);
      sessionStorage.setItem("coreR", detalhes.core);

      document.getElementById("razaoSocial").value = detalhes.razaoSocial;
      document.getElementById("cnpj").value = detalhes.cnpj;
      document.getElementById("email").value = detalhes.email;
      document.getElementById("fone").value = detalhes.fone;
      document.getElementById("core").value = detalhes.core;

      detalhe.addEventListener("click", (d) => {
        if (d.target.id == "fechar" || d.target.id == "janela-detalhes") {
          detalhe.classList.remove("abrir");
        }
      });
    });
}
