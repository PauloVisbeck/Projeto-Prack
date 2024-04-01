function getID(){
    var obj = getTokenValores();
    return fetch(`https://localhost:7165/api/Representantes/${Number(obj.nameid)}`)
        .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
        });
}
function lerDados(){
    getID()
    .then(dados => {
    document.getElementById('razaoSocial').value = dados.razaoSocial;
    document.getElementById('cnpj').value = dados.cnpj;
    document.getElementById('core').value = dados.core;
    document.getElementById('fone').value = dados.fone;
    document.getElementById('email').value = dados.email;
    document.getElementById('senha').value = dados.senha;
    })
}

function getTokenValores(){
    var token = localStorage.getItem('token')
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
function salvar(){
    var obj = getTokenValores();
    var representante;
    getID().then(dados => {
        var representante = {
            id: dados.id,
            razaoSocial: dados.razaoSocial,
            cnpj: dados.cnpj,
            email: document.getElementById('email').value,
            core: dados.core,
            fone: document.getElementById('fone').value,
            status: dados.status,
            senha: document.getElementById('senha').value,
            cargo: dados.cargo
        };
        const option = {
            method: "Put",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(representante),
        };
        fetch(`https://localhost:7165/api/Representantes/${Number(obj.nameid)}`, option);
    })
    

}