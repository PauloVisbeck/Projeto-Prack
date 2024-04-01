const quadrado1_vendas_mes = document.getElementById("TotalDeVendasDoMes");
quadrado1_vendas_mes.textContent = 0;

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

const obj = getTokenValores();
const id_vendedor = obj.nameid;
const role = obj.role;

//verificação de admim e representante
if (role == "Admin") {
  window.addEventListener("load", graficosAdmin);
} else if (role == "Representante") {
  window.addEventListener("load", graficos);
} else {
  console.log("error role não identificada");
}

//grafico representante
function graficos() {
  if (id_vendedor) {
    //quadrados
    get_vendas_quadrado_01(id_vendedor);
    //graficos
    get_vendas_metas(id_vendedor);
    get_vendas_estado();
    get_vendas_cliente();
  } else {
    console.error("id do representante não encontrado.");
  }
}

//graficos admin
function graficosAdmin() {
  if (id_vendedor) {
    //quadrados
    get_vendas_quadrado_01_Admin();
    //graficos
    get_vendas_metas_Admin();
    get_vendas_estado_Admin();
    get_vendas_cliente_Admin();
  } else {
    console.error("id do representante não encontrado.");
  }
}

function getPedidosVendedorAnteriores(id_vendedor, mesAtual) {
  return fetch(`https://localhost:7165/api/Pedidos/${id_vendedor}`)
    .then((response) => {
      return response.json();
    })
    .then((pedidos) => {
      const pedidosDoMesEAnteriores = pedidos.filter((pedido) => {
        const data = new Date(pedido.data);
        const mes = data.getMonth() + 1;
        return mes <= mesAtual;
      });
      return pedidosDoMesEAnteriores;
    })
    .catch((error) => {
      console.error("Erro ao buscar os pedidos do vendedor:", error);
    });
}
function getPedidosVendedorMes(id_vendedor, mesAtual) {
  return fetch(`https://localhost:7165/api/Pedidos/${id_vendedor}`)
    .then((response) => {
      return response.json();
    })
    .then((pedidos) => {
      const pedidosDoMesAtual = pedidos.filter((pedido) => {
        const data = new Date(pedido.data);
        return data.getMonth() === mesAtual - 1;
      });
      return pedidosDoMesAtual;
    })
    .catch((error) => {
      console.error("Erro ao buscar os pedidos do vendedor:", error);
    });
}

function get_vendas_quadrado_01(id_vendedor) {
  const mesAtual = new Date().getMonth() + 1;
  getPedidosVendedorMes(id_vendedor, mesAtual)
    .then((pedidosDoMesAtual) => {
      let totalVendas = 0;
      pedidosDoMesAtual.forEach((pedido) => {
        totalVendas += pedido.valorTotal;
      });
      quadrado1_vendas_mes.textContent = totalVendas.toFixed(2);
    })
    .catch((error) => {
      console.error("Erro ao obter as vendas do vendedor no mês atual:", error);
    });
}
async function get_vendas_metas(id_vendedor) {
  try {
    const mesAtual = new Date().getMonth() + 1;
    const pedidosVendedor = await getPedidosVendedorAnteriores(
      id_vendedor,
      mesAtual
    );

    await get_metas_mes_e_anteriores();

    const vendas_por_mes = Array.from({ length: 12 }, () => 0);

    pedidosVendedor.forEach((element) => {
      const data = new Date(element.data);
      const mes = data.getMonth();

      vendas_por_mes[mes] += element.valorTotal.toFixed(2);
    });

    const mesesDoAno = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const data1 = {
      labels: mesesDoAno,
      datasets: [
        {
          label: "Vendas",
          data: vendas_por_mes,
          backgroundColor: "rgba(5, 121, 240, 0.51)",
          borderColor: "rgba(5, 121, 240, 1)",
          borderWidth: 1,
        },
        {
          label: "Metas",
          data: meta_mes,
          backgroundColor: "rgba(54, 162, 235, 0.3)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    const options1 = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx1 = document.getElementById("grafico-1").getContext("2d");
    const myChart1 = new Chart(ctx1, {
      type: "bar",
      data: data1,
      options: options1,
    });
  } catch (error) {
    console.error("Erro ao obter as vendas e metas:", error);
  }
}

const meta_mes = [];

async function get_metas_mes_e_anteriores() {
  try {
    const response = await fetch(`https://localhost:7165/api/Metas`);
    if (!response.ok) {
      throw new Error("Erro ao buscar as metas.");
    }
    const data = await response.json();

    const today = new Date();
    const currentMonth = today.getMonth();

    const metasDoMesAtualEAnteriores = data.filter((meta) => {
      const dataDaMeta = new Date(meta.data);
      const mesDaMeta = dataDaMeta.getMonth();

      return (
        dataDaMeta.getFullYear() <= today.getFullYear() &&
        mesDaMeta <= currentMonth
      );
    });

    metasDoMesAtualEAnteriores.forEach((meta) => {
      meta_mes.push(meta.metaDeVendas);
    });

    console.log(meta_mes);
  } catch (error) {
    console.error("Erro ao buscar as metas:", error);
  }
}

function get_vendas_estado() {
  var data2 = {
    labels: ["SP", "RJ", "MG", "RS", "PR"],
    datasets: [
      {
        label: "Vendas por Estado",
        data: [500, 400, 300, 200, 150],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  var options2 = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  var ctx2 = document.getElementById("grafico-2").getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: "bar",
    data: data2,
    options: options2,
  });
}

function get_vendas_cliente() {
  var data3 = {
    labels: ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5"],
    datasets: [
      {
        label: "Total de Compras",
        data: [10000, 8000, 6000, 5000, 4000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  var options3 = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  var ctx3 = document.getElementById("grafico-3").getContext("2d");
  var myChart3 = new Chart(ctx3, {
    type: "bar",
    data: data3,
    options: options3,
  });
}

//escrita represetante
function get_vendas_acumulada() {
  fetch("https://localhost:7165/api/Pedidos")
    .then((dados) => dados.json())
    .then((resposta) => {
      const venda_acumulada = document.getElementById("VendaAcumuladaAno");
      let totalVendas = 0;
      resposta.forEach((element) => {
        totalVendas += element.valorTotal.toFixed(2);
      });
      quadrado1_vendas_mes.textContent = totalVendas;
    });
}

//Admin quadrados
function get_vendas_quadrado_01_Admin() {
  fetch("https://localhost:7165/api/Pedidos")
    .then((dados) => dados.json())
    .then((resposta) => {
      let totalVendas = 0;
      resposta.forEach((element) => {
        totalVendas += element.valorTotal;
      });
      quadrado1_vendas_mes.textContent = totalVendas.toFixed(2);
    });
}

//Admin graficos
function get_vendas_metas_Admin() {
  fetch("https://localhost:7165/api/Pedidos")
    .then((dados) => dados.json())
    .then((resposta) => {
      const valor_de_venda_mes = [];
      const valor_meta = [];
      const vendas_por_mes = Array.from({ length: 12 }, () => 0); // Array de 12 elementos inicializados com 0

      resposta.forEach((element) => {
        const data = new Date(element.data);
        const mes = data.getMonth(); // Retornará o mês de 0 a 11

        // Adicionar o valorTotal ao total de vendas do mês correspondente
        vendas_por_mes[mes] += element.valorTotal;
      });

      const mesesDoAno = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      const data1 = {
        labels: mesesDoAno,
        datasets: [
          {
            label: "Vendas",
            data: vendas_por_mes,
            backgroundColor: "rgba(5, 121, 240, 0.51)",
            borderColor: "rgba(5, 121, 240, 1)",
            borderWidth: 1,
          },
          {
            label: "Metas",
            data: valor_meta, // Se precisar de valores para as metas, adicione-os aqui
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      const options1 = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      const ctx1 = document.getElementById("grafico-1").getContext("2d");
      const myChart1 = new Chart(ctx1, {
        type: "bar",
        data: data1,
        options: options1,
      });
    });
}

function get_vendas_estado_Admin() {
  fetch("https://localhost:7165/api/Pedidos")
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Erro ao obter os dados de vendas.");
      }
      return resposta.json();
    })
    .then((pedidos) => {
      // Inicializa o objeto vendasPorEstado com chaves indefinidas
      const vendasPorEstado = {};

      // Preenche o objeto com os dados dos pedidos
      pedidos.forEach((pedido) => {
        const estado = pedido.loja.estado;
        const valorTotal = pedido.valorTotal;

        // Se o estado já existe no objeto, incrementa o valorTotal
        // Caso contrário, define o estado com o valorTotal
        if (vendasPorEstado[estado]) {
          vendasPorEstado[estado] += valorTotal;
        } else {
          vendasPorEstado[estado] = valorTotal;
        }
      });

      // Cria o objeto data2 para o gráfico
      const data2 = {
        labels: Object.keys(vendasPorEstado), // Obtém as chaves do objeto como labels
        datasets: [
          {
            label: "Vendas por Estado",
            data: Object.values(vendasPorEstado), // Obtém os valores do objeto como dados
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      const options2 = {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      };

      // Cria o gráfico
      const ctx2 = document.getElementById("grafico-2").getContext("2d");
      const myChart2 = new Chart(ctx2, {
        type: "bar",
        data: data2,
        options: options2,
      });
    })
    .catch((erro) => {
      console.error("Erro ao obter os dados de vendas:", erro);
    });
}

function get_vendas_cliente_Admin() {
  var data3 = {
    labels: ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5"],
    datasets: [
      {
        label: "Total de Compras",
        data: [10000, 8000, 6000, 5000, 4000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  var options3 = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  var ctx3 = document.getElementById("grafico-3").getContext("2d");
  var myChart3 = new Chart(ctx3, {
    type: "bar",
    data: data3,
    options: options3,
  });
}
