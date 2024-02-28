// 1. Ajusta la vista inicial al área de 
// interés en el mapa utilizando Leaflet
var map = 
L.map('map').setView([
    28.097495225084906, 
    -15.439406475083926
], 13);

// 2. Añade una capa de mapa base usando 
// OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // 3. Créditos de la capa de mapa, 
    // requerido por OpenStreetMap
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 4. Definir iconos personalizados
var redIcon = new L.Icon({
    // URL de la imagen del icono azul
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',

    // URL de la sombra del icono
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    // Tamaño del icono en píxeles
    iconSize: [25, 41],

    // Punto del icono que corresponde a 
    // su "ancla" (punto de ubicación 
    // geográfica)
    iconAnchor: [12, 41],

    // Ajuste para la posición del popup 
    // relacionado con el icono
    popupAnchor: [1, -34],

    // Tamaño de la sombra del icono
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

// 13. Coordenadas de referencia para 
// IES Ana Luisa Benítez
var refLatlng = 
L.latLng(
    28.097495225084906, -15.439406475083926
);

// 14. Añadir marcador fijo para la 
// ubicación de IES Ana Luisa Benítez 
// con icono rojo
L.marker(
    refLatlng, {icon: redIcon}
).addTo(map).bindPopup(
    "IES Ana Luisa Benítez"
).openPopup();

// 15. Variable global para el 
// marcador del usuario
var userMarker; 

// 16. Función para manejar el 
// evento de ubicación encontrada
function onLocationFound(e) {
    // 17. Ubicación del usuario
    var userLatlng = e.latlng; 

    // 18. Calcula la distancia
    var distance = 
    userLatlng.distanceTo(refLatlng); 

    // 19. Verificar si ya existe un 
    // marcador y actualizar su 
    // posición
    if (userMarker) {
        userMarker.setLatLng(userLatlng)
            .setPopupContent(
                "Estás a " + 
                distance.toFixed(2) + 
                " metros del IES Ana Luisa Benítez."
            ).openPopup();
    } 
    
    else {
        // 20. Si no existe, crear un 
        // nuevo marcador
        userMarker = 
        L.marker(
            userLatlng, {icon: blueIcon}
        ).addTo(map).bindPopup(
            "Estás a " + 
            distance.toFixed(2) + 
            " metros del IES Ana Luisa Benítez."
        ).openPopup();
    }
}

// 21. Función para manejar el evento de 
// error de ubicación
function onLocationError(e) {
    // 22. Muestra un mensaje de error si 
    // la ubicación no puede ser 
    // encontrada
    alert(e.message); 
}

// 23. Registrar manejadores de eventos 
// para 'locationfound' y 'locationerror'
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// 24. Inicia la localización del usuario, 
// ajusta la vista al encontrarla, 
// actualiza la ubicación automáticamente 
// y habilita alta precisión
map.locate({
    setView: true, 
    maxZoom: 16, 
    watch: true, 
    enableHighAccuracy: true
});
