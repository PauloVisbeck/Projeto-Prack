document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um ouvinte de evento ao botão "Editar"
  function addEditButton(rowId) {
    var editButton = document.createElement("button");
    editButton.innerHTML = "Editar";
    editButton.addEventListener("click", function () {
      editRow(rowId);
    });

    return editButton;
  }

  function addDeleteButton(rowId) {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.addEventListener("click", function () {
      deleteRow(rowId);
    });

    return deleteButton;
  }

  function editRow(rowId) {
    alert("Editar linha com ID " + rowId);
  }

  function deleteRow(rowId) {
    var tabela = document
      .getElementById("tabelaProdutos")
      .getElementsByTagName("table")[0];
    tabela.deleteRow(rowId);

    updateSomas();
  }

  function updateSomas() {
    var tabela = document
      .getElementById("tabelaProdutos")
      .getElementsByTagName("table")[0];
    var somaQuantidade = 0;
    var somaTotalProduto = 0;

    for (var i = 1; i < tabela.rows.length; i++) {
      var quantidade = parseInt(tabela.rows[i].cells[2].innerHTML, 10);
      var vlrTotalProduto = parseFloat(
        tabela.rows[i].cells[4].innerHTML.replace("R$ ", "")
      );

      somaQuantidade += quantidade;
      somaTotalProduto += vlrTotalProduto;
    }

    document.getElementById("somaQuantidade").innerHTML = somaQuantidade;
    document.getElementById("somaTotalProduto").innerHTML =
      "R$ " + somaTotalProduto.toFixed(2);

    var precoMedio = somaTotalProduto / somaQuantidade;
    document.getElementById("precoMedio").innerHTML = precoMedio.toFixed(2);
  }

  document
    .getElementById("btnProximo")
    .addEventListener("click", function (event) {
      event.preventDefault();

      var produto = document.getElementById("produto").value;
      var quantidade = parseInt(
        document.getElementById("quantidade").value,
        10
      );
      var vlrUnitario = parseFloat(
        document.getElementById("vlrUnitario").value
      );

      if (produto && !isNaN(quantidade) && !isNaN(vlrUnitario)) {
        var tabela = document
          .getElementById("tabelaProdutos")
          .getElementsByTagName("table")[0];
        var rowId = tabela.rows.length;

        var newRow = tabela.insertRow(tabela.rows.length);

        var cellId = newRow.insertCell(0);
        var cellProduto = newRow.insertCell(1);
        var cellQuantidade = newRow.insertCell(2);
        var cellVlrUnitario = newRow.insertCell(3);
        var cellVlrTotalProduto = newRow.insertCell(4);
        var cellEditar = newRow.insertCell(5);
        var cellExcluir = newRow.insertCell(6);

        cellId.innerHTML = rowId;
        cellProduto.innerHTML = produto;
        cellQuantidade.innerHTML = quantidade;
        cellVlrUnitario.innerHTML = "R$ " + vlrUnitario.toFixed(2);
        cellVlrTotalProduto.innerHTML =
          "R$ " + (quantidade * vlrUnitario).toFixed(2);
        cellEditar.appendChild(addEditButton(rowId));
        cellExcluir.appendChild(addDeleteButton(rowId));

        updateSomas();

        document.getElementById("produto").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("vlrUnitario").value = "";
        document.getElementById("produto").focus();
      } else {
        alert("Atenção, existem campos em branco!");
      }
    });
});
