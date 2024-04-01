document.addEventListener("DOMContentLoaded", function() {
    const mensagemLi = document.querySelector(".mensagem");

    mensagemLi.addEventListener("click", function(event) {
        const target = event.target;

        // Verifica se o clique ocorreu na li de mensagens ou em um elemento filho
        if (target.closest(".mensagem")) {
            const sino = mensagemLi.querySelector(".notificacao");

            if (sino) {
                sino.style.display = "none";
            }
        }
    });
});