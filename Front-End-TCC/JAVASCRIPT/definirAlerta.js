function definirAlertaLojas() {
  const alerta = document.getElementById("janela-alertas");
  alerta.classList.add("abrir");
  console.log();

  alerta.addEventListener("click", (d) => {
    if (d.target.id == "fechar" || d.target.id == "janela-alertas") {
      alerta.classList.remove("abrir");
    }
  });
}