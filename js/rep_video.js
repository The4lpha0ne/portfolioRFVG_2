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
    // fullscreenBtn.addEventListener(
    //     'click', function() {
    //         if (video.requestFullscreen) {

    //             video.requestFullscreen();
    //         } 
            
    //         else if (video.mozRequestFullScreen) {

    //             video.mozRequestFullScreen();
    //         } 
            
    //         else if (video.webkitRequestFullscreen) {

    //             video.webkitRequestFullscreen();
    //         } 
            
    //         else if (video.msRequestFullscreen) {

    //             video.msRequestFullscreen();
    //         }
    //     }
    // );

    // 13. Activar el modo pantalla completa. Agrega un 
    // 'event listener' al botón de pantalla completa
    fullscreenBtn.addEventListener('click', function() {
        // 14. Inicializa una variable para almacenar el 
        // método de solicitud de pantalla completa
        var requestMethod;

        // 15. Determina el método de solicitud de 
        // pantalla completa según el navegador
        if (video.requestFullscreen) {
            // 16. Método estándar, utilizado por la 
            // mayoría de los navegadores modernos
            requestMethod = 'standard';
        } 
        
        else if (video.mozRequestFullScreen) {
            // 17. Método específico de Firefox
            requestMethod = 'firefox';
        } 
        
        else if (video.webkitRequestFullscreen) {
            // 18. Método específico de Chrome, 
            // Safari y Opera
            requestMethod = 'webkit';
        } 
        
        else if (video.msRequestFullscreen) {
            // 19. Método específico de Internet 
            // Explorer y Edge
            requestMethod = 'ms';
        }

        // 20. Ejecuta el método de pantalla completa 
        // según el navegador
        switch(requestMethod) {
            case 'standard':
                // 21. Invoca el método estándar de 
                // pantalla completa
                video.requestFullscreen();
                break;
            case 'firefox':
                // 22. Invoca el método de pantalla 
                // completa de Firefox.
                video.mozRequestFullScreen();
                break;
            case 'webkit':
                // 23. Invoca el método de pantalla 
                // completa de Webkit (Chrome, 
                // Safari, Opera)
                video.webkitRequestFullscreen();
                break;
            case 'ms':
                // 24. Invoca el método de pantalla 
                // completa de Microsoft (IE, Edge)
                video.msRequestFullscreen();
                break;
            default:
                // 25. Registra un mensaje si el 
                // modo de pantalla completa no está 
                // disponible
                console.log('El modo pantalla completa no está disponible.');
                break;
        }
    });

    // 26. Actualiza la barra de progreso conforme 
    // avanza el vídeo
    video.addEventListener('timeupdate', function() {
        var value = 
        (100 / video.duration) * video.currentTime;

        // 27. Actualiza la barra de progreso
        progressBar.value = value;
    });

    // 28. Mejora en la interacción con la barra de 
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

    // 29. Carga y establece el volumen guardado cuando 
    //se carga la página. Se obtiene el volumen 
    // guardado de localStorage
    var savedVolume = 
    localStorage.getItem('videoVolume');

    if (savedVolume) {
        // 30. Establecer el volumen del vídeo
        video.volume = savedVolume;
        // 31. Ajustar el control de volumen en la 
        // interfaz de usuario
        volumeControl.value = savedVolume; 
    }
});

// 32. Función para cambiar el vídeo actual
function changeVideo(sourceUrl) {
    // 33. Se obtiene el elemento de video
    var videoPlayer = 
    document.getElementById('video');

    // 34. Se cambia la fuente del video
    videoPlayer.src = sourceUrl;

    // 35. Se inicia la reproducción del nuevo 
    // video
    videoPlayer.play();
}
