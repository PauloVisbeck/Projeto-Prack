function post(){
  var obj = {
      data: document.getElementById('date').value,
      metaDeVendas: document.getElementById('valorMeta').value
  }
  console.log(obj)
  const option = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
  };
  fetch('https://localhost:7165/api/Metas', option)
}