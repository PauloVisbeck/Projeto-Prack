document.addEventListener("DOMContentLoaded", function abrirAlerta() {
  const mensagem = document.getElementById("janelaModal");

  const mensagemFechadaTime = localStorage.getItem("mensagemFechadaTime");

  if (!mensagemFechadaTime || deveExibirNovamente(mensagemFechadaTime)) {
    mensagem.classList.add("abrir");
    document.body.style.overflow = 'hidden';

  }

  mensagem.addEventListener("click", (m) => {
    if (m.target.id == "fechar" || m.target.id == "janelaModal") {
      mensagem.classList.remove("abrir");
      document.body.style.overflow = '';

      localStorage.setItem("mensagemFechadaTime", new Date().toISOString());
    }
  });

  function deveExibirNovamente(fechadaTime) {
    const tempoPassado = new Date() - new Date(fechadaTime);
    const tempoLimite = 0.2 * 120 * 1000;

    return tempoPassado >= tempoLimite;
  }
});