document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video');
    var playPauseBtn = document.getElementById('play-pause');
    var stopBtn = document.getElementById('stop');
    var rewindBtn = document.getElementById('rewind');
    var fastForwardBtn = document.getElementById('fast-forward');
    var fullscreenBtn = document.getElementById('fullscreen');
    var progressBar = document.getElementById('progress-bar');
    var volumeControl = document.getElementById('volume-control'); // Asegúrate de que este es el ID correcto.

    // Control de errores para el video
    video.addEventListener('error', function(e) {
        alert('Hubo un error al cargar el video. Por favor, intenta con otro video.');
    });

    playPauseBtn.addEventListener('click', function() {
        if(video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    stopBtn.addEventListener('click', function() {
        video.pause();
        video.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    });

    rewindBtn.addEventListener('click', function() {
        video.currentTime -= 10;
    });

    fastForwardBtn.addEventListener('click', function() {
        video.currentTime += 10;
    });

    // Añadimos un 'event listener' para manejar los cambios en el control de volumen
    volumeControl.addEventListener('input', function() {
        video.volume = volumeControl.value;
        localStorage.setItem('videoVolume', volumeControl.value); // Guardar estado del volumen
    });

    fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    video.addEventListener('timeupdate', function() {
        var value = (100 / video.duration) * video.currentTime;
        progressBar.value = value;
    });

    // Mejora en la interacción con la barra de progreso
    progressBar.addEventListener('input', function(e) {
        var percent = e.target.value;
        video.currentTime = percent * video.duration / 100;
    });

    // Cargar y establecer el volumen guardado al cargar la página
    var savedVolume = localStorage.getItem('videoVolume');
    if (savedVolume) {
        video.volume = savedVolume;
        volumeControl.value = savedVolume; // Asegúrate de que el control de volumen en la UI también se actualiza
    }
});

function changeVideo(sourceUrl) {
    var videoPlayer = document.getElementById('video');
    videoPlayer.src = sourceUrl;
    videoPlayer.play();
}
