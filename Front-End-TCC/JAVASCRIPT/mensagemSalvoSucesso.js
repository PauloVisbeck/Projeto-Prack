function abrirMensagem() {
  const mensagem = document.getElementById("janelaModal");
  mensagem.classList.add("abrirModal");

  mensagem.addEventListener("click", (m) => {
    if (m.target.id == "fechar" || m.target.id == "janelaModal") {
      mensagem.classList.remove("abrirModal");
    }
  });
}