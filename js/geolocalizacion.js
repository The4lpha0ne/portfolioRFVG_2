// Ajusta la vista inicial al área de interés
var map = 
L.map('map').setView([28.097495225084906, -15.439406475083926], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Definir iconos personalizados
var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Coordenadas de referencia para IES Ana Luisa Benítez
var refLatlng = L.latLng(28.097495225084906, -15.439406475083926);

// Añadir marcador fijo para la ubicación de IES Ana Luisa Benítez 
// con icono rojo
L.marker(refLatlng, {icon: redIcon}).addTo(map)
    .bindPopup("IES Ana Luisa Benítez").openPopup();

function onLocationFound(e) {
    // Ubicación del usuario
    var userLatlng = e.latlng;

    // Calcular distancia a las coordenadas de referencia
    var distance = userLatlng.distanceTo(refLatlng);

    // Añadir marcador de la ubicación actual del usuario 
    // con icono azul
    L.marker(userLatlng, {icon: blueIcon}).addTo(map)
        .bindPopup("Estás a " + distance.toFixed(2) + " metros del IES Ana Luisa Benítez.").openPopup();
}

function onLocationError(e) {
    // Muestra un mensaje de error si la ubicación no puede 
    // ser encontrada
    alert(e.message); 
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Inicia la localización del usuario, ajusta la vista al 
// encontrarla y actualiza la ubicación automáticamente
map.locate({setView: true, maxZoom: 16, watch: true}); 
