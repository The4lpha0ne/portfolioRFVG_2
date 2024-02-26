// 1. Se ejecuta después de que el DOM 
// esté completamente cargado.
document.addEventListener('DOMContentLoaded', function() {
    // 2. Referencias a los elementos de audio y 
    // controles.
    var reproductor = 
    document.getElementById('reproductorDOR');

    var volumeControl = 
    document.getElementById('volumeControl');

    var progressControl = 
    document.getElementById('progressControl');

    // 3. Toggle play/pause al hacer clic en el 
    // botón correspondiente
    window.togglePlayPause = function() {
        // 4. Botón de play/pause
        var btn = document.getElementById('playPauseBtn'); 
        if (reproductor.paused || reproductor.ended) {
            reproductor.play(); 
            // 5. Cambia el texto del botón a "Pausa"
            btn.textContent = 'Pause'; 
        } 
        
        else {
            reproductor.pause();
            // 6. Cambia el texto del botón a 
            // "Reproducir"
            btn.textContent = 'Play'; 
        }
    };

    // 7. Escuchar cambios en el control deslizante de 
    // volumen de forma continua.
    volumeControl.addEventListener('input', function() {
        // 8. Actualiza el volumen en tiempo real.
        reproductor.volume = this.value; 
    });

    // 9. Actualización del control de progreso según 
    // el tiempo actual del audio.
    reproductor.addEventListener('timeupdate', function() {
        let value = 
        (100 / reproductor.duration) * reproductor.currentTime;

        progressControl.value = value;
    });

    // 10. Función para cambiar la fuente del audio y 
    // reproducir automáticamente.
    window.changeTrack = function(track) {
        reproductor.src = track;
        
        reproductor.play();
    };

    // 11. Ajuste del control de progreso para buscar 
    // dentro del audio.
    progressControl.addEventListener('input', function() {
        let time = 
        (reproductor.duration / 100) * this.value;
        
        reproductor.currentTime = time;
    });

    // 12. Función para parar la reproducción del 
    // audio.
    window.stopAudio = function() {
        reproductor.pause();
        reproductor.currentTime = 0;
    };

    // 13. Función para retroceder 10 segundos en 
    // el audio.
    window.rewind10 = function() {
        reproductor.currentTime = 
        Math.max(0, reproductor.currentTime - 10);
    };

    // 14. Función para avanzar 10 segundos en el 
    // audio.
    window.forward10 = function() {
        reproductor.currentTime = 
        Math.min(
            reproductor.duration, 
            reproductor.currentTime + 10
        );
    };

    // 15. Función para saltar al inicio del audio.
    window.skipToStart = function() {
        reproductor.currentTime = 0;
        reproductor.play();
    };

    // 16. Función para saltar al final del audio.
    window.skipToEnd = function() {
        reproductor.currentTime = 
        reproductor.duration;
        reproductor.pause();
    };
});
