document.addEventListener("DOMContentLoaded", function() {
    mostrarSaludoUsuario();
    mostrarPreferencias();
});

function mostrarSaludoUsuario() {
    let nombreUsuario = getCookie("nombreUsuario");
    const saludo = document.getElementById("saludo-usuario");

    if (nombreUsuario) {
        saludo.innerText = `¡Bienvenido de nuevo, <<<${nombreUsuario}>>>!`;
    } else {
        saludo.innerText = "¡Bienvenido Usuario, a la página de preferencias!";
    }
}

function mostrarPreferencias() {
    // Inicializa localStorage con un arreglo vacío si es la primera vez.
    if (!localStorage.getItem("preferencias")) {
        localStorage.setItem("preferencias", JSON.stringify([]));
    }

    const preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const listaPreferencias = document.getElementById("lista-preferencias");

    if (preferencias.length > 0) {
        listaPreferencias.innerHTML = preferencias.map(pref => `
            <li class="lista-p">
                ${pref.nombre} --> Fondo: ${pref.colorFondo}, Letra: ${pref.colorLetra}
                <br>
                <button class="boton_usar" onclick="aplicarPreferencia('${pref.nombre}')">Usar Preferencia</button>
                <button class="boton_editar" onclick="cargarPreferencia('${pref.nombre}')">Editar</button>
                <button class="boton_eliminar" onclick="eliminarPreferencia('${pref.nombre}')">Eliminar</button>
            </li>
            <br>
        `).join("");
    } else {
        listaPreferencias.innerHTML = "No hay preferencias guardadas.";
    }
}

function cargarPreferencia(nombrePreferencia) {
    const preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const preferencia = preferencias.find(pref => pref.nombre === nombrePreferencia);

    if (preferencia) {
        // Redirige al usuario al formulario de edición con los datos de la preferencia.
        localStorage.setItem('preferenciaActual', JSON.stringify({id: preferencia.id, ...preferencia}));
        window.location.href = 'add_preferencia.html';
    }
}

function eliminarPreferencia(nombrePreferencia) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la preferencia "${nombrePreferencia}"?`);
    if (confirmacion) {
        let preferencias = JSON.parse(localStorage.getItem("preferencias"));
        preferencias = preferencias.filter(pref => pref.nombre !== nombrePreferencia);
        localStorage.setItem("preferencias", JSON.stringify(preferencias));
        mostrarPreferencias(); // Actualiza la lista de preferencias en la página
    }
}

function getCookie(nombre) {
    let nombreIgual = nombre + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nombreIgual) == 0) {
            return c.substring(nombreIgual.length, c.length);
        }
    }
    return "";
}

function aplicarPreferencia(nombrePreferencia) {
    const preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const preferencia = preferencias.find(pref => pref.nombre === nombrePreferencia);

    if (preferencia) {
        alert(`Has elegido aplicar la preferencia "${nombrePreferencia}" con fondo: ${preferencia.colorFondo} y letra: ${preferencia.colorLetra}`);
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

// Llamar a aplicarEstiloInicial cuando la página se carga
document.addEventListener('DOMContentLoaded', aplicarEstiloInicial);
