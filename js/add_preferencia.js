document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-preferencia");
    const editando = localStorage.getItem('preferenciaActual') !== null;

    // Prellenar el formulario si se está editando una preferencia
    if (editando) {
        const preferenciaActual = JSON.parse(localStorage.getItem('preferenciaActual'));
        document.getElementById('nombre-preferencia').value = preferenciaActual.nombre;
        document.getElementById('color-fondo').value = preferenciaActual.colorFondo;
        document.getElementById('color-letra').value = preferenciaActual.colorLetra;
        document.getElementById('editando').value = 'true'; // Asume que tienes este campo en tu formulario
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre-preferencia').value;
        const colorFondo = document.getElementById('color-fondo').value;
        const colorLetra = document.getElementById('color-letra').value;
        const estaEditando = document.getElementById('editando').value === 'true';

        if (estaEditando) {
            actualizarPreferencia(nombre, colorFondo, colorLetra);
        } else {
            guardarPreferencia(nombre, colorFondo, colorLetra);
        }

        // Limpiar el formulario y la preferencia actual en localStorage
        formulario.reset();
        localStorage.removeItem('preferenciaActual');
        window.location.href = 'preferencias.html'; // Redirige al usuario a la página de preferencias
    });
});

function guardarPreferencia(nombre, colorFondo, colorLetra) {
    const preferencias = JSON.parse(localStorage.getItem("preferencias")) || [];
    preferencias.push({ nombre, colorFondo, colorLetra });
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
}

function actualizarPreferencia(nombre, colorFondo, colorLetra) {
    let preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const indice = preferencias.findIndex(pref => pref.nombre === nombre);

    if (indice !== -1) {
        preferencias[indice] = { nombre, colorFondo, colorLetra };
    } else {
        // Si no se encuentra la preferencia, simplemente la añade
        preferencias.push({ nombre, colorFondo, colorLetra });
    }
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
}
