// preferencias.js

document.addEventListener("DOMContentLoaded", function() {
    mostrarSaludoUsuario();
    mostrarPreferencias();
});

function mostrarSaludoUsuario() {
    let nombreUsuario = getCookie("nombreUsuario");
    const saludo = document.getElementById("saludo-usuario");

    if (nombreUsuario) {
        saludo.innerText = `¡Bienvenido de nuevo, ${nombreUsuario}!`;
    } else {
        saludo.innerText = "¡Bienvenido a nuestra página de preferencias!";
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
            <li>
                ${pref.nombre}: Fondo ${pref.colorFondo}, Letra ${pref.colorLetra}
                <button onclick="eliminarPreferencia('${pref.nombre}')">Eliminar</button>
                <button onclick="cargarPreferencia('${pref.nombre}')">Editar</button>
            </li>
        `).join("");
    } else {
        listaPreferencias.innerHTML = "No hay preferencias guardadas.";
    }
}

function cargarPreferencia(nombrePreferencia) {
    const preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const preferencia = preferencias.find(pref => pref.nombre === nombrePreferencia);

    if (preferencia) {
        // Aquí deberías redirigir al usuario al formulario de edición con los datos de la preferencia.
        // Como ejemplo, se mostrará cómo podrías rellenar un formulario hipotético.
        localStorage.setItem('preferenciaActual', JSON.stringify(preferencia));
        window.location.href = 'editar_preferencia.html'; // Asume que tienes esta página o modal para editar.
    }
}

function eliminarPreferencia(nombrePreferencia) {
    let preferencias = JSON.parse(localStorage.getItem("preferencias"));
    preferencias = preferencias.filter(pref => pref.nombre !== nombrePreferencia);
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
    mostrarPreferencias(); // Actualiza la lista de preferencias en la página
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
