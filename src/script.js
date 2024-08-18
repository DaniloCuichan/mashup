function iniciarMap() {
  // Obtener datos de coordenadas desde la API
  fetch('http://localhost:3000/api/coordenadas')
    .then(response => response.json())
    .then(coordenadas => {
      // Crear el mapa con el primer punto como centro
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coordenadas[0]  // Centrar el mapa en el primer punto
      });

      // Agregar marcadores para cada coordenada
      coordenadas.forEach(function(coord) {
        var marker = new google.maps.Marker({
          position: { lat: coord.lat, lng: coord.lng },
          map: map,
          title: coord.title  // Título mostrado al pasar el cursor
        });

        var infowindow = new google.maps.InfoWindow({
          content: coord.title  // Información mostrada al hacer clic
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
    })
    .catch(error => console.error('Error al obtener las coordenadas:', error));
}
