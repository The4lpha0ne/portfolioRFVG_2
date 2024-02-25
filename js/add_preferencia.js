document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-preferencia");
    // Verifica directamente si preferenciaActual tiene valor
    const preferenciaActual = JSON.parse(localStorage.getItem('preferenciaActual'));
    const editando = preferenciaActual !== null;

    if (editando) {
        document.getElementById('nombre-preferencia').value = preferenciaActual.nombre;
        document.getElementById('color-fondo').value = preferenciaActual.colorFondo;
        document.getElementById('color-letra').value = preferenciaActual.colorLetra;
        // Asegura que el formulario sepa que está editando
        document.getElementById('editando').value = 'true'; 
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

        formulario.reset();
        localStorage.removeItem('preferenciaActual');
        window.location.href = 'preferencias.html';
    });
});

function guardarPreferencia(nombre, colorFondo, colorLetra) {
    const preferencias = JSON.parse(localStorage.getItem("preferencias")) || [];
    // Se crea un nuevo ID basado en el mayor ID existente + 1
    const nuevoId = preferencias.length > 0 ? Math.max(...preferencias.map(pref => pref.id)) + 1 : 1;
    preferencias.push({ id: nuevoId, nombre, colorFondo, colorLetra });
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
}

function actualizarPreferencia(nombre, colorFondo, colorLetra) {
    let preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const preferenciaActual = JSON.parse(localStorage.getItem('preferenciaActual'));
    const index = preferencias.findIndex(pref => pref.id === preferenciaActual.id);

    if (index !== -1) {
        preferencias[index] = { ...preferencias[index], nombre, colorFondo, colorLetra };
        localStorage.setItem("preferencias", JSON.stringify(preferencias));
    }
    
    else {
        console.error("Intentando actualizar una preferencia que no existe.");
    }
}

function aplicarPreferencia(nombrePreferencia) {
    const preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const preferencia = preferencias.find(pref => pref.nombre === nombrePreferencia);

    if (preferencia) {
        document.body.style.backgroundColor = preferencia.colorFondo;
        document.body.style.color = preferencia.colorLetra;
        // Guarda la preferencia aplicada
        localStorage.setItem("preferenciaAplicada", JSON.stringify(preferencia));
    }
}

function aplicarEstiloInicial() {
    const preferenciaAplicada = JSON.parse(localStorage.getItem("preferenciaAplicada"));
    if (preferenciaAplicada) {
        document.body.style.backgroundColor = preferenciaAplicada.colorFondo;
        document.body.style.color = preferenciaAplicada.colorLetra;
    }
}

// Llama a aplicarEstiloInicial cuando la página se carga
document.addEventListener('DOMContentLoaded', aplicarEstiloInicial);