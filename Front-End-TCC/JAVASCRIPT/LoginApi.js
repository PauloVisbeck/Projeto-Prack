function Login() {
  console.log("asd");
  const cnpjInput = document.getElementById("cnpjinput");
  const senhaInput = document.getElementById("senhainput");
  const dataUsuario = {
    Cnpj: cnpjInput.value,
    Senha: senhaInput.value,
  };

  fetch("https://localhost:7165/api/Representantes/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUsuario),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        const Cnpj = data.cnpj;
        const Cargo = data.cargo;

        window.location.href = "http://127.0.0.1:5502/HTML/2-dashBoard.html";
      } else {
        throw new Error("Token não encontrado na resposta.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}
