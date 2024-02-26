// 1. Ajusta la vista inicial al área de interés en el 
// mapa utilizando Leaflet
var map = 
L.map('map').setView(
    [28.097495225084906, -15.439406475083926], 
    13
); 

// 2. Añade una capa de mapa base usando OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // 3. Créditos de la capa de mapa, requerido por 
    // OpenStreetMap
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 4. Definir iconos personalizados
var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', 
    // 5. Tamaño del icono
    iconSize: [25, 41], 
    // 6. Punto del icono que corresponderá exactamente a 
    // la ubicación del marcador
    iconAnchor: [12, 41], 
    // 7. Punto donde se mostrará el popup del marcador, 
    // relativo a iconAnchor
    popupAnchor: [1, -34], 
    // 8. Tamaño de la sombra del icono
    shadowSize: [41, 41] 
});

var blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', 
    // 9. Tamaño del icono
    iconSize: [25, 41], 
    // 10. Punto del icono que corresponderá exactamente 
    // a la ubicación del marcador
    iconAnchor: [12, 41], 
    // 11. Punto donde se mostrará el popup del marcador, 
    // relativo a iconAnchor
    popupAnchor: [1, -34], 
    // 12. Tamaño de la sombra del icono
    shadowSize: [41, 41] 
});

// 13. Coordenadas de referencia para IES Ana Luisa 
// Benítez
var refLatlng = 
L.latLng(28.097495225084906, -15.439406475083926);

// 14. Añadir marcador fijo para la ubicación de IES 
// Ana Luisa Benítez con icono rojo
L.marker(refLatlng, {icon: redIcon}).addTo(map)
    .bindPopup("IES Ana Luisa Benítez").openPopup();

// 15. Función para manejar el evento de ubicación 
// encontrada
function onLocationFound(e) {
    // 16. Ubicación del usuario
    var userLatlng = e.latlng;

    // 17. Calcular distancia a las coordenadas de 
    // referencia
    var distance = userLatlng.distanceTo(refLatlng);

    // 18. Añadir marcador de la ubicación actual del 
    // usuario 
    // con icono azul
    L.marker(userLatlng, {icon: blueIcon}).addTo(map)
        .bindPopup("Estás a " + distance.toFixed(2) + 
        " metros del IES Ana Luisa Benítez.").openPopup();
}

// 19. Función para manejar el evento de error de 
// ubicación
function onLocationError(e) {
    // Muestra un mensaje de error si la ubicación no 
    // puede ser encontrada
    alert(e.message); 
}

// 20.  Registrar manejadores de eventos para 
// 'locationfound' y 'locationerror'
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// 21. Inicia la localización del usuario, ajusta 
// la vista al encontrarla y actualiza la ubicación 
// automáticamente
map.locate({setView: true, maxZoom: 16, watch: true}); 
