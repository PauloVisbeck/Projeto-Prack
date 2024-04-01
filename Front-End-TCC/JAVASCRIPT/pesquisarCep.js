function dadosEndereco() {
  let cep = document.getElementById("cep").value;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((dados) => dados.json())
    .then((response) => {
      document.getElementById("cep").value = response.cep;
      document.getElementById("rua").value = response.logradouro;
      document.getElementById("numero").value;
      document.getElementById("bairro").value = response.bairro;
      document.getElementById("cidade").value = response.localidade;
      document.getElementById("estado").value = response.uf;
    })

    .catch((erro) => console.log(erro));
}
