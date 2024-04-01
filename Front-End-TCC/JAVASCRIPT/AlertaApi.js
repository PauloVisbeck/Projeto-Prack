function getLembrete() {
  var obj = getTokenValores();
  token = localStorage.getItem("token");
  document.getElementById("tabelalerta").innerHTML = "";
  if (obj.role == "Admin") {
    fetch(`https://localhost:7165/api/Lembretes`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((dados) => dados.json())
      .then((resposta) => {
        if (resposta) {
          resposta.forEach((element) => {
            if (element.loja) {
              var data = calcularTempoRestante(element.dataLembrete);

              let tempoRestante = "";
              let ultimacompraF = "";
              if (data.anos > 0) {
                tempoRestante = `${data.anos} ano${data.anos > 1 ? "s" : ""}`;
              } else if (data.meses > 0) {
                tempoRestante = `${data.meses} mês${
                  data.meses > 1 ? "es" : ""
                }`;
              } else {
                tempoRestante = `${data.dias} dia${data.dias > 1 ? "s" : ""}`;
              }
              if (element.loja.ultimaCompra == null) {
                ultimacompraF = "Sem pedido realizado";
              } else {
                ultimacompraF = element.loja.ultimaCompra;
              }
              document.getElementById("tabelalerta").innerHTML += `<tr>
                            <td>${element.loja.nomeLoja}</td>
                            <td>${ultimacompraF}
                            <td>${tempoRestante} atrás</td>
                        </tr>`;
            }
          });
        }
      });
  } else {
    fetch(`https://localhost:7165/api/Lembretes/${Number(obj.nameid)}`)
      .then((dados) => dados.json())
      .then((resposta) => {
        if (resposta) {
          resposta.forEach((element) => {
            if (element.loja) {
              var data = calcularTempoRestante(element.dataLembrete);

              let tempoRestante = "";
              let ultimacompraF = "";
              if (data.anos > 0) {
                tempoRestante = `${data.anos} ano${data.anos > 1 ? "s" : ""}`;
              } else if (data.meses > 0) {
                tempoRestante = `${data.meses} mês${
                  data.meses > 1 ? "es" : ""
                }`;
              } else {
                tempoRestante = `${data.dias} dia${data.dias > 1 ? "s" : ""}`;
              }
              if (element.loja.ultimaCompra == null) {
                ultimacompraF = "Sem pedido realizado";
              } else {
                ultimacompraF = element.loja.ultimaCompra;
              }
              document.getElementById("tabelalerta").innerHTML += `<tr>
                            <td>${element.loja.nomeLoja}</td>
                            <td>${ultimacompraF}
                            <td>${tempoRestante} atrás</td>
                        </tr>`;
            }
          });
        }
      });
  }
}
var idLoja;
function postLembrete() {
  var obj = getTokenValores();
  var data = document.getElementById("tempoDefinido123").value;

  fetch(`https://localhost:7165/api/Lembretes/${Number(obj.nameid)}`)
    .then((dados) => dados.json())
    .then((resposta) => {
      if (resposta) {
        var lembrete = {
          dataLembrete: data,
          loja: {
            id: idLoja,
          },
        };
        var link = "https://localhost:7165/api/Lembretes";

        var metodoHTTP = "POST";

        resposta.forEach((element) => {
          if (element.loja.id == idLoja) {
            lembrete.id = element.id;
            metodoHTTP = "PUT"; // Se a loja já tem um lembrete, então é uma atualização.
            link = `https://localhost:7165/api/Lembretes/${lembrete.id}`;
          }
        });

        const option = {
          method: metodoHTTP,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lembrete),
        };

        fetch(link, option)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Erro na requisição: ${response.status} - ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((data) => {
            // Lógica para lidar com a resposta bem-sucedida.
          })
          .catch((error) => {
            console.error("Erro na requisição:", error);
          });
      }
    });
}
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
function calcularTempoRestante(dataFutura) {
  // Converte a data fornecida para um objeto Date
  const dataFuturaObj = new Date(dataFutura);

  // Obtém a data e hora atuais
  const dataAtual = new Date();

  // Calcula a diferença em milissegundos
  const diferencaEmMilissegundos = dataFuturaObj - dataAtual;

  // Calcula a diferença em dias, horas, minutos e segundos
  const anos = Math.floor(
    diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25)
  );
  const meses = Math.floor(
    (diferencaEmMilissegundos % (1000 * 60 * 60 * 24 * 365.25)) /
      (1000 * 60 * 60 * 24 * 30.44)
  );
  const dias = Math.floor(
    (diferencaEmMilissegundos % (1000 * 60 * 60 * 24 * 30.44)) /
      (1000 * 60 * 60 * 24)
  );

  return {
    anos,
    meses,
    dias,
  };
}

function definirAlertaLojas(id) {
  fetch(`https://localhost:7165/api/Lojas/getDetalhes${id}`)
    .then((dados) => dados.json())
    .then((resposta) => {
      resposta.forEach((element) => {
        idLoja = element.id;
        document.getElementById("lojanome123").value = element.nomeLoja;
        document.getElementById("cnpj123").value = element.cnpj;
      });
    });
  mostrarPainel();
}
function mostrarPainel() {
  const alerta = document.getElementById("janela-alertas");
  alerta.classList.add("abrir");

  alerta.addEventListener("click", (d) => {
    if (d.target.id == "fechar" || d.target.id == "janela-alertas") {
      alerta.classList.remove("abrir");
    }
  });
}
