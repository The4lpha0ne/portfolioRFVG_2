// Asumiendo que este código se ejecuta después de que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos de audio y controles.
    var reproductor = document.getElementById('reproductorDOR');
    var volumeControl = document.getElementById('volumeControl');
    var progressControl = document.getElementById('progressControl');

    // Toggle play/pause al hacer clic en el botón correspondiente.
    window.togglePlayPause = function() {
        var btn = document.getElementById('playPauseBtn'); // Botón de play/pause.
        if (reproductor.paused || reproductor.ended) {
            reproductor.play();
            btn.textContent = 'Pause'; // Cambia el texto del botón a "Pausa".
        } else {
            reproductor.pause();
            btn.textContent = 'Play'; // Cambia el texto del botón a "Reproducir".
        }
    };

    // Escuchar cambios en el control deslizante de volumen de forma continua.
    volumeControl.addEventListener('input', function() {
        reproductor.volume = this.value; // Actualiza el volumen en tiempo real.
    });

    // Actualización del control de progreso según el tiempo actual del audio.
    reproductor.addEventListener('timeupdate', function() {
        let value = (100 / reproductor.duration) * reproductor.currentTime;
        progressControl.value = value;
    });

    // Función para cambiar la fuente del audio y reproducir automáticamente.
    window.changeTrack = function(track) {
        reproductor.src = track;
        reproductor.play();
    };

    // Ajuste del control de progreso para buscar dentro del audio.
    progressControl.addEventListener('input', function() {
        let time = (reproductor.duration / 100) * this.value;
        reproductor.currentTime = time;
    });

    // Función para parar la reproducción del audio.
    window.stopAudio = function() {
        reproductor.pause();
        reproductor.currentTime = 0;
    };

    // Función para retroceder 10 segundos en el audio.
    window.rewind10 = function() {
        reproductor.currentTime = Math.max(0, reproductor.currentTime - 10);
    };

    // Función para avanzar 10 segundos en el audio.
    window.forward10 = function() {
        reproductor.currentTime = Math.min(reproductor.duration, reproductor.currentTime + 10);
    };

    // Función para saltar al inicio del audio.
    window.skipToStart = function() {
        reproductor.currentTime = 0;
        reproductor.play();
    };

    // Función para saltar al final del audio.
    window.skipToEnd = function() {
        reproductor.currentTime = reproductor.duration;
        reproductor.pause();
    };
});
