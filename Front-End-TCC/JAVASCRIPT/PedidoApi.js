var listaProdutos = [];

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
function get() {
  var obj = getTokenValores();
  var token = localStorage.getItem("token");
  document.getElementById("tablepedido").innerHTML = "";
  if (obj.role == "Representante") {
    fetch(`https://localhost:7165/api/Pedidos/${Number(obj.nameid)}`)
      .then((dados) => dados.json())
      .then((resposta) =>
        resposta.forEach((element) => {
          var status;
          if (element.status == true) {
            status = "Ativo";
          } else {
            status = "Desativado";
          }
          document.getElementById("tablepedido").innerHTML += `
        <tr>
        <td>${element.loja.razaoSocial}</td>
        <th>${element.empresa.razaoSocial}</th>
        <td>${element.percentualComissao}</td>
        <td>${element.data}</td>
        <td>R$: ${element.valorTotal}</td>
        <td>${element.colecao}</td>
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
        </td>
        </tr>
    `;
        })
      );
  } else {
    fetch(`https://localhost:7165/api/Pedidos`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((dados) => dados.json())
      .then((resposta) =>
        resposta.forEach((element) => {
          if (resposta) {
            var status;
            if (element.status == true) {
              status = "Ativo";
            } else {
              status = "Desativado";
            }
            document.getElementById("tablepedido").innerHTML += `
        <tr>
        <td>${element.loja.razaoSocial}</td>
        <th>${element.empresa.razaoSocial}</th>
        <td>${element.percentualComissao}</td>
        <td>${element.data}</td>
        <td>R$: ${element.valorTotal.toFixed(2)}</td>
        <td>${element.colecao}</td>
        <td>${status}</td>
        <td>
        <button class="excluir" onclick="deletar(${element.id})" title="Apagar">
        <img src="../img/icon-lixeira.png" alt="Ícone de lixeira" />
        </button>
        <button class="detalhes" onclick="abrirDetalhesPedidos(${
          element.id
        })" title="Detalhes"> 
        <img src="../img/icon-details.png" alt="Ícone de detalhes"/>
        </button>
        <button class="editar" onclick="alterar(${element.id})"title="Editar">
        <img src="../img/icon-edit.png" alt="Ícone de edição" />
        </button>    
        </td>
        </tr>
    `;
          }
        })
      );
  }
}

function deletar(id) {
  fetch(`https://localhost:7165/api/Pedidos/${id}`, { method: "Delete" });
}

function alterar(id) {
  var obj = getTokenValores();
  var data = document.getElementById("date").value;
  var colecao = document.getElementById("categoria").value;
  var fornecedor = document.getElementById("fornecedorSelect").value;
  var cliente = document.getElementById("clienteSelect").value;
  var PercentualComissao = document.getElementById("comissao").value;

  const pedido = {
    id,
    data,
    colecao,
    valorTotal: 0,
    PercentualComissao,
    empresa: {
      id: fornecedor,
    },
    loja: {
      id: cliente,
    },
    representante: {
      id: Number(obj.nameid),
    },
  };
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  };
  fetch(`https://localhost:7165/api/Pedidos/${id}`, option);
}

function getFornecedor() {
  document.getElementById(
    "fornecedorSelect"
  ).innerHTML = `<option>Fornecedor: </option>`;
  fetch("https://localhost:7165/api/Empresas")
    .then((dados) => dados.json())
    .then((resposta) =>
      resposta.forEach((element) => {
        document.getElementById(
          "fornecedorSelect"
        ).innerHTML += `<option value="${element.id}">${element.razaoSocial}</option>`;
      })
    );
}
function getCliente() {
  document.getElementById(
    "clienteSelect"
  ).innerHTML = `<option>Cliente: </option>`;
  var token = localStorage.getItem("token");
  var valoresDoToken = getTokenValores();
  if (valoresDoToken.role == "Representante") {
    fetch(`https://localhost:7165/api/Lojas/${Number(valoresDoToken.nameid)}`)
      .then((dados) => dados.json())
      .then((resposta) =>
        resposta.forEach((element) => {
          document.getElementById(
            "clienteSelect"
          ).innerHTML += `<option value="${element.id}">${element.razaoSocial}</option>`;
        })
      );
  } else {
    fetch(`https://localhost:7165/api/Lojas`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((dados) => dados.json())
      .then((resposta) =>
        resposta.forEach((element) => {
          document.getElementById(
            "clienteSelect"
          ).innerHTML += `<option value="${element.id}">${element.razaoSocial}</option>`;
        })
      );
  }
}
function postPedido() {
  var obj = getTokenValores();
  var data = document.getElementById("date").value;
  var colecao = document.getElementById("categoria").value;
  var fornecedor = document.getElementById("fornecedorSelect").value;
  var cliente = document.getElementById("clienteSelect").value;
  var percentualComissao = document.getElementById("comissao").value;

  const pedido = {
    data,
    colecao,
    percentualComissao,
    valorTotal: 0,
    status: true,
    empresa: {
      id: fornecedor,
    },
    loja: {
      id: cliente,
    },
    representante: {
      id: Number(obj.nameid),
    },
  };
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  };
  fetch("https://localhost:7165/api/Pedidos", option)
    .then((dados) => dados.json())
    .then((resposta) => {
      salvarProduto(resposta.id);
      abrirMensagem();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar pedido:", error);
    });
}

function guardarProduto() {
  produtos = {
    id: listaProdutos.length,
    produto: document.getElementById("produto").value,
    quantidade: parseInt(document.getElementById("quantidade").value),
    valorUnitario: parseFloat(document.getElementById("vlrUnitario").value),
  };
  listaProdutos.push(produtos);
  listarTable();
}

function listarTable() {
  document.getElementById("tabelaProd").innerHTML = "";
  listaProdutos.forEach(
    (element) =>
      (document.getElementById("tabelaProd").innerHTML += `<tr>
        <td>${element.id + 1}</td>
        <td>${element.produto}</td>
        <td>${element.quantidade}</td>
        <td>R$: ${element.valorUnitario}</td>
        <td>R$: ${(element.valorUnitario * element.quantidade).toFixed(2)}</td>
        <td><button class="excluir" onclick="deletar(${
          element.id
        })">Excluir</button>
        <button class="editar" onclick="alterar(${
          element.id
        })">Editar</button></td>
        </tr>`)
  );
  somas();
}
function deletar(id) {
  delete listaProdutos[id];
  listarTable();
}
function alterar(id) {
  document.getElementById("botaoVerseNome").innerHTML = "Alterar";
  var botao = document.getElementById("botaoVerse");
  document.getElementById("produto").value = listaProdutos[id].produto;
  document.getElementById("quantidade").value = listaProdutos[id].quantidade;
  document.getElementById("vlrUnitario").value =
    listaProdutos[id].valorUnitario;
  botao.setAttribute("onclick", `alterarValores(${id});`);
}
function alterarValores(id) {
  document.getElementById("botaoVerseNome").innerHTML = "Adicionar";
  var botao = document.getElementById("botaoVerse");
  botao.setAttribute("onclick", "guardarProduto();");
  produtos = {
    id: id,
    produto: document.getElementById("produto").value,
    quantidade: parseInt(document.getElementById("quantidade").value),
    valorUnitario: parseFloat(document.getElementById("vlrUnitario").value),
  };
  listaProdutos[id] = produtos;
  listarTable();
}
function salvarProduto(id) {
  var valorTotal = 0;

  for (let i = 0; i < listaProdutos.length; i++) {
    valorTotal += listaProdutos[i].valorUnitario * listaProdutos[i].quantidade;

    var produto = {
      descricao: listaProdutos[i].produto,
      quantidade: listaProdutos[i].quantidade,
      valorunitario: listaProdutos[i].valorUnitario,
      pedidoid: id,
    };
    var option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    };
    fetch("https://localhost:7165/api/Produtos", option);
    console.log("Produto enviado");
  }

  const optionPedido = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ valorTotal: valorTotal }),
  };
  fetch(`https://localhost:7165/api/Pedidos/${id}`, optionPedido).then(() => {
    somas();
  });
}

function somas() {
  var quantidadeTotal = 0;
  var valorMedio = 0;
  var valorTotal = 0;
  for (let i = 0; i < listaProdutos.length; i++) {
    quantidadeTotal += listaProdutos[i].quantidade;
    valorTotal += listaProdutos[i].valorUnitario * listaProdutos[i].quantidade;
  }

  if (quantidadeTotal > 0) {
    valorMedio = valorTotal / quantidadeTotal;
  }

  document.getElementById("somaQuantidade").innerHTML = quantidadeTotal;
  document.getElementById(
    "somaTotalProduto"
  ).innerHTML = `R$: ${valorTotal.toFixed(2)}`;
  document.getElementById("precoMedio").innerHTML = `R$: ${valorMedio.toFixed(
    2
  )}`;
}

function abrirDetalhesPedidos(id) {
  const detalhe = document.getElementById("janela-detalhes");
  detalhe.classList.add("abrir");

  detalhe.addEventListener("click", (d) => {
    if (d.target.id == "fechar" || d.target.id == "janela-detalhes") {
      detalhe.classList.remove("abrir");
    }
  });
}