var nomeUser;
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

function verSidebarRole() {
  var obj = getTokenValores();
  nomeUser = obj.unique_name;
  if (obj.role == "Admin") {
    Sidebar_Admin();
  } else {
    Sidebar_Representante();
  }
  vincularCSS();
}

function Sidebar_Representante() {
  var header = document.createElement("header");
  var nav = document.createElement("nav");
  var div = document.createElement("div");
  var h3 = document.createElement("h3");
  header.classList.add("header");
  div.innerHTML =
    '<a id="perfil" href="../HTML/2.1-perfil.html"><img src="../img/perfil.png" alt="perfil"></a>' +
    `<h1 id="perfil" class="nome">${nomeUser}</h1>`;
  nav.appendChild(div);
  var ul = document.createElement("ul");
  ul.innerHTML =
    '<li id="dashboard" onload="abrirAlerta()"><a href="../HTML/2-dashBoard.html"><img src="../img/icon-dashboard.png" alt="dashboard" ><span class="nome">Dashboard</span></a></li>' +
    '<li id="pedidos"><a href="../HTML/3-listaPedidos.html"><img src="../img/icon-carrinho-de-mercado.png" alt="pedidos"><span class="nome">Pedidos</span></a></li>' +
    '<li id="empresa"><a href="../HTML/4-listaEmpresas.html"><img src="../img/icon-empresa.png" alt="empresa"><span class="nome">Empresas</span></a></li>' +
    '<li id="lojas"><a href="../HTML/5-listaLojas.html"><img src="../img/icon.loja.png" alt="lojas"><span class="nome">Lojas</span></a></li>' +
    '<li id="cadastro"><a href="../HTML/7.0.2-cadastro.html"><img src="../img/icon-cadastro.png" alt="cadastro"><span class="nome">Cadastro</span></a></li>' +
    '<li id="alerta"><a href="../HTML/8-listaAlerta.html"><img src="../img/icon-alerta.png" alt="alerta"><span class="nome">Inativos</span></a></li>' +
    '<li id="mensagem" class="mensagem" style="margin-left:0%; padding-top: 10px;"><a href="../HTML/9-mensagem.html" ><img src="../img/icon-mensagem.png" alt="mensagem"><span class="nome">Mensagem</span></a><span class="sino"><img src="../img/icon-notificação.png" class="notificacao"></img></span></li>' + 
    '<li id="sair"><a href="../HTML/1-index.html"><img src="../img/icon-logout.png" alt="sair"><span class="nome">Sair</span></a></li>';
  h3.innerHTML = '<h2 class="marca-logo nome">PRACK</h2>';
  nav.appendChild(ul);
  header.appendChild(nav);
  header.appendChild(h3);
  document.body.appendChild(header);
  vincularCSS();
}

function Sidebar_Admin() {
  var header = document.createElement("header");
  var nav = document.createElement("nav");
  var div = document.createElement("div");
  var h3 = document.createElement("h3");
  header.classList.add("header");
  div.innerHTML =
    '<a id="perfil" href="../HTML/2.1-perfil.html"><img src="../img/perfil.png" alt="perfil"></a>' +
    `<h1 id="perfil" class="nome">${nomeUser}</h1>`;
  nav.appendChild(div);
  var ul = document.createElement("ul");
  ul.innerHTML =
    '<li id="dashboard" onload="abrirAlerta()"><a href="../HTML/2-dashBoard.html"><img src="../img/icon-dashboard.png" alt="dashboard" ><span class="nome">Dashboard</span></a></li>' +
    '<li id="pedidos"><a href="../HTML/3-listaPedidos.html"><img src="../img/icon-carrinho-de-mercado.png" alt="pedidos"><span class="nome">Pedidos</span></a></li>' +
    '<li id="empresa"><a href="../HTML/4-listaEmpresas.html"><img src="../img/icon-empresa.png" alt="empresa"><span class="nome">Empresas</span></a></li>' +
    '<li id="lojas"><a href="../HTML/5-listaLojas.html"><img src="../img/icon.loja.png" alt="lojas"><span class="nome">Lojas</span></a></li>' +
    '<li id="representantes"><a href="../HTML/6-listaRepresentantes.html"><img src="../img/icon-representante.png" alt="representantes"><span class="nome">Representantes</span></a></li>' +
    '<li id="cadastro"><a href="../HTML/7-cadastro.html"><img src="../img/icon-cadastro.png" alt="cadastro"><span class="nome">Cadastro</span></a></li>' +
    '<li id="alerta"><a href="../HTML/8-listaAlerta.html"><img src="../img/icon-alerta.png" alt="alerta"><span class="nome">Inativos</span></a></li>' +
    '<li id="mensagem" class="mensagem" style="margin-left:0%; padding-top: 10px;"><a href="../HTML/9-mensagem.html" ><img src="../img/icon-mensagem.png" alt="mensagem"><span class="nome">Mensagem</span></a><span class="sino"><img src="../img/icon-notificação.png" class="notificacao"></img></span></li>' + 
    '<li id="sair"><a href="../HTML/1-index.html"><img src="../img/icon-logout.png" alt="sair"><span class="nome">Sair</span></a></li>';
  h3.innerHTML = '<h2 class="marca-logo nome">PRACK</h2>';
  nav.appendChild(ul);
  header.appendChild(nav);
  header.appendChild(h3);
  document.body.appendChild(header);
  vincularCSS();
}
function vincularCSS() {
  var linkElement = document.createElement("link");

  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = "../CSS/navbar.css";
  document.head.appendChild(linkElement);
}
