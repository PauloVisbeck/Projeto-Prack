function getmensagem(){
    document.getElementById('mensagens').innerHTML = ""
    var data
    fetch('https://localhost:7165/api/Mensagens')
    .then(data => data.json())
    .then(resposta => 
        resposta.forEach(element => {
            var dataObj = new Date(element.data);
            data = `${("0" + dataObj.getDate()).slice(-2)}-${("0" + (dataObj.getMonth() + 1)).slice(-2)}-${dataObj.getFullYear()} ${("0" + dataObj.getHours()).slice(-2)}:${("0" + dataObj.getMinutes()).slice(-2)}`;
            document.getElementById('mensagens').innerHTML += `
            <tr>
            <td>${element.conteudo}</td>
            <td>${data}</td>
            <td><button onclick="deletar(${element.id})">X</button>
            <button onclick="alterar(${element.id})">Alt</button>
            </td>
            </tr>`;
        }))
}

function postmensagem(){
    var conteudo = document.getElementById('Conteudo').value
    var cancelamentoData = document.getElementById('data').value
    var data = new Date()
    var ano = data.getFullYear();
    var mes = ("0" + (data.getMonth() + 1)).slice(-2);
    var dia = ("0" + data.getDate()).slice(-2);
    
    var horas = ("0" + data.getHours()).slice(-2);
    var minutos = ("0" + data.getMinutes()).slice(-2);
    
    var dataFormatada = ano + "-" + mes + "-" + dia + "T" + horas + ":" + minutos;

    var mensagem = {
        representanteId: 1,
        conteudo,
        data: dataFormatada, 
        cancelamentoData,
    }
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem),
    }
    fetch('https://localhost:7165/api/Mensagens', option)
    getmensagem()
}
function deletar(id){
    fetch(`https://localhost:7165/api/Mensagens/${id}`, {method: 'Delete'})
    getmensagem()
}
function alterar(id){
    document.getElementById("botaoVerseNome").innerHTML = "Alterar"
    fetch(`https://localhost:7165/api/Mensagens/${id}`)
    .then(response => response.json())
    .then(resposta => {
        if (resposta && resposta.conteudo && resposta.cancelamentoData) {
            document.getElementById('Conteudo').value = resposta.conteudo;
            document.getElementById('data').value = resposta.cancelamentoData;
        }
        })
    var botao = document.getElementById("botaoVerse")
    botao.setAttribute("onclick",`alterarValores(${id});`);
}
function alterarValores(id){
    document.getElementById("botaoVerseNome").innerHTML = "Adicionar"
    var botao = document.getElementById("botaoVerse")
    botao.setAttribute("onclick","postmensagem();");
    var data = new Date()
    var ano = data.getFullYear();
    var mes = ("0" + (data.getMonth() + 1)).slice(-2);
    var dia = ("0" + data.getDate()).slice(-2);
    
    var horas = ("0" + data.getHours()).slice(-2);
    var minutos = ("0" + data.getMinutes()).slice(-2);
    
    var dataFormatada = ano + "-" + mes + "-" + dia + "T" + horas + ":" + minutos;
    var mensagem={
        id: id,
        conteudo: document.getElementById('Conteudo').value,
        data: dataFormatada,
        cancelamentoData: document.getElementById('data').value
    }
    const option = {
        method: 'Put',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(mensagem),
        };
        fetch(`https://localhost:7165/api/Mensagens/${id}`, option)
    }
