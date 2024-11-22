document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([-16.2902, -63.5887], 5); // Centrado en Bolivia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Cargar datos de radiobases desde la API.
    fetch('api/get_radiobases.php?country=Bolivia') // Asegúrate de que la API acepte este parámetro.
        .then(response => response.json())
        .then(data => {
            data.forEach(radiobase => {
                // Crear un ícono personalizado para el marcador parpadeante.
                const blinkingIcon = L.divIcon({
                    className: 'blinking-marker',
                    html: `<div class="blinking-dot"></div>`,
                    iconSize: [20, 20]
                });

                // Agregar el marcador con el ícono personalizado.
                L.marker([radiobase.lat, radiobase.lng], { icon: blinkingIcon })
                    .bindPopup(`<b>${radiobase.nombre}</b>`)
                    .addTo(map);
            });
        })
        .catch(error => console.error('Error al cargar las radiobases:', error));
});
