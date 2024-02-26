document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener referencias a elementos del DOM 
    // necesarios para controlar el vídeo
    var video = 
    document.getElementById('video');
    
    var playPauseBtn = 
    document.getElementById('play-pause');

    var stopBtn = 
    document.getElementById('stop');

    var rewindBtn = 
    document.getElementById('rewind');

    var fastForwardBtn = 
    document.getElementById('fast-forward');

    var fullscreenBtn = 
    document.getElementById('fullscreen');

    var progressBar = 
    document.getElementById('progress-bar');

    var volumeControl = 
    document.getElementById('volume-control');

    // 2. Control de errores para el video
    video.addEventListener('error', function(e) {
        alert(
            'Hubo un error al cargar el video. Por favor, intenta con otro video.'
        );
    });

    // 3. Reproducir o pausar el vídeo
    playPauseBtn.addEventListener(
        'click', function() {
            if(video.paused) {
                video.play();
                playPauseBtn.textContent = 'Pause';
            } 
            
            else {
                video.pause();
                playPauseBtn.textContent = 'Play';
            }
        }
    );

    // 4. Detener la reproducción del vídeo
    stopBtn.addEventListener(
        'click', function() {
            // 5. Pausa el vídeo
            video.pause();
            // 6. Reiniciar el tiempo del vídeo a 0
            video.currentTime = 0;
            // 7. Restablecer el texto del botón a "Play"
            playPauseBtn.textContent = 'Play';
        }
    );

    // 8. Retroceder el vídeo
    rewindBtn.addEventListener(
        'click', function() {
            video.currentTime -= 10;
        }
    );

    // 9. Avanzar el vídeo
    fastForwardBtn.addEventListener(
        'click', function() {
            video.currentTime += 10;
        }
    );

    // 10. Se añade un 'event listener' para manejar 
    // los cambios en el control de volumen
    volumeControl.addEventListener(
        'input', function() {
            // 11. Ajustar el volumen del vídeo
            video.volume = volumeControl.value;

            // 12. Guardar el volumen actual en 
            // localStorage
            localStorage.setItem(
                'videoVolume', 
                volumeControl.value
            );
        }
    );

    // 13. Activar el modo pantalla completa
    fullscreenBtn.addEventListener(
        'click', function() {
            if (video.requestFullscreen) {
                // Método estándar
                video.requestFullscreen();
            } 
            
            else if (video.mozRequestFullScreen) {
                // Firefox
                video.mozRequestFullScreen();
            } 
            
            else if (video.webkitRequestFullscreen) {
                // Chrome, Safari y Opera
                video.webkitRequestFullscreen();
            } 
            
            else if (video.msRequestFullscreen) {
                // IE/Edge
                video.msRequestFullscreen();
            }
        }
    );

    // 14. Actualiza la barra de progreso conforme 
    // avanza el vídeo
    video.addEventListener('timeupdate', function() {
        var value = 
        (100 / video.duration) * video.currentTime;

        // 15. Actualiza la barra de progreso
        progressBar.value = value;
    });

    // 16. Mejora en la interacción con la barra de 
    // progreso. Permite al usuario buscar dentro 
    // del vídeo
    progressBar.addEventListener(
        'input', function(e) {
            var percent = 
            e.target.value;

            video.currentTime = 
            percent * video.duration / 100;
        }
    );

    // 17. Carga y establece el volumen guardado cuando 
    //se carga la página. Se obtiene el volumen 
    // guardado de localStorage
    var savedVolume = 
    localStorage.getItem('videoVolume');

    if (savedVolume) {
        // 18. Establecer el volumen del vídeo
        video.volume = savedVolume;
        // 19. Ajustar el control de volumen en la 
        // interfaz de usuario
        volumeControl.value = savedVolume; 
    }
});

// 20. Función para cambiar el vídeo actual
function changeVideo(sourceUrl) {
    // 21. Se obtiene el elemento de video
    var videoPlayer = 
    document.getElementById('video');

    // 22. Se cambia la fuente del video
    videoPlayer.src = sourceUrl;

    // 23. Se inicia la reproducción del nuevo 
    // video
    videoPlayer.play();
}
