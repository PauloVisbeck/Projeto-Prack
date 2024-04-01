document.getElementById('segmento').addEventListener('change', function() {
  if (this.value === 'cadastrar') {
      document.getElementById('modal').style.display = 'block';
  }
});

document.getElementById('form-segmento').addEventListener('submit', function(event) {
  event.preventDefault();
  var novoSegmento = document.getElementById('novo-segmento').value.trim();
  if (novoSegmento === "") {
      document.getElementById('error-message').style.display = 'block';
      return;
  }
  var selectSegmento = document.getElementById('segmento');
  var option = document.createElement('option');
  option.text = novoSegmento;
  option.value = novoSegmento;
  selectSegmento.insertBefore(option, selectSegmento.lastElementChild);
  selectSegmento.value = novoSegmento;
  document.getElementById('modal').style.display = 'none';
});