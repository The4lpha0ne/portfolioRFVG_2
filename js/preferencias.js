// 1. Espera a que el DOM esté completamente 
// cargado antes de ejecutar las funciones.
document.addEventListener("DOMContentLoaded", function() {
    mostrarSaludoUsuario();
    mostrarPreferencias();
});

// 2. Función para mostrar un saludo personalizado 
// al usuario.
function mostrarSaludoUsuario() {
    // 3. Obtiene el nombre del usuario desde una 
    // cookie.
    let nombreUsuario = getCookie("nombreUsuario");
    const saludo = document.getElementById("saludo-usuario");

    // 4. Si el nombre del usuario existe, muestra un 
    // saludo personalizado.
    if (nombreUsuario) {
        saludo.innerText = `¡Bienvenido de nuevo, <<<${nombreUsuario}>>>!`;
    } 
    
    else {
        // 5. Si no, muestra un saludo genérico.
        saludo.innerText = "¡Bienvenido Usuario, a la página de preferencias!";
    }
}

// 6. Función para mostrar las preferencias guardadas 
// por el usuario.
function mostrarPreferencias() {
    // 7. Inicializa localStorage con un arreglo vacío si 
    // es la primera vez.
    if (!localStorage.getItem("preferencias")) {
        localStorage.setItem("preferencias", JSON.stringify([]));
    }

    // 8. Obtiene las preferencias guardadas y las muestra 
    // en la página.
    const preferencias = JSON.parse(localStorage.getItem("preferencias"));
    const listaPreferencias = document.getElementById("lista-preferencias");

    // 9. Si hay preferencias guardadas, las muestra en 
    // una lista.
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
    } 
    
    else {
        // 10. Si no hay preferencias, muestra un mensaje 
        // indicándolo.
        listaPreferencias.innerHTML = "No hay preferencias guardadas.";
    }
}

// 11. Función para cargar una preferencia específica 
// para su edición.
function cargarPreferencia(nombrePreferencia) {
    // 12. Obtiene las preferencias guardadas.
    const preferencias = JSON.parse(localStorage.getItem("preferencias"));

    // 13. Encuentra la preferencia específica por 
    // su nombre.
    const preferencia = preferencias.find(pref => pref.nombre === nombrePreferencia);

    // 14. Si la preferencia existe, guarda los datos para su edición 
    // y redirige al usuario.
    if (preferencia) {
        // 15. Redirige al usuario al formulario de edición con 
        // los datos de la preferencia.
        localStorage.setItem('preferenciaActual', JSON.stringify({id: preferencia.id, ...preferencia}));
        window.location.href = 'add_preferencia.html';
    }
}

// 16. Función para eliminar una preferencia específica.
function eliminarPreferencia(nombrePreferencia) {
    // 17. Confirma si el usuario realmente desea eliminar 
    // la preferencia.
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la preferencia "${nombrePreferencia}"?`);
    
    if (confirmacion) {
        let preferencias = JSON.parse(localStorage.getItem("preferencias"));

        // 18. Filtra la preferencia a eliminar y actualiza 
        // el almacenamiento.
        preferencias = preferencias.filter(pref => pref.nombre !== nombrePreferencia);
        localStorage.setItem("preferencias", JSON.stringify(preferencias));

        // 19. Actualiza la lista de preferencias en 
        // la página
        mostrarPreferencias(); 
    }
}

// 20. Función para obtener el valor de una cookie por su nombre.
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

// 21. Función para aplicar una preferencia de estilo 
// seleccionada por el usuario.
function aplicarPreferencia(nombrePreferencia) {
    // 22. Obtiene las preferencias guardadas y encuentra 
    // la específica a aplicar.
    const preferencias = 
    JSON.parse(localStorage.getItem("preferencias"));

    const preferencia = 
    preferencias.find(pref => pref.nombre === nombrePreferencia);

    // 23. Si la preferencia existe, aplica los estilos y 
    // muestra un mensaje de confirmación.
    if (preferencia) {
        alert(`Has elegido aplicar la preferencia "${nombrePreferencia}" con fondo: ${preferencia.colorFondo} y letra: ${preferencia.colorLetra}`);
        document.body.style.backgroundColor = preferencia.colorFondo;
        document.body.style.color = preferencia.colorLetra;
        // 24. Guarda la preferencia aplicada para uso futuro.
        localStorage.setItem("preferenciaAplicada", JSON.stringify(preferencia));
    }
}

// 25. Función para aplicar el estilo inicial basado en la 
// preferencia aplicada previamente.
function aplicarEstiloInicial() {
    // 26. Verifica si existe una preferencia aplicada y, de ser así, 
    // aplica sus estilos.
    const preferenciaAplicada = 
    JSON.parse(localStorage.getItem("preferenciaAplicada"));

    if (preferenciaAplicada) {
        document.body.style.backgroundColor = preferenciaAplicada.colorFondo;
        document.body.style.color = preferenciaAplicada.colorLetra;
    }
}

// 27. Llamar a aplicarEstiloInicial cuando la página 
// se carga
document.addEventListener('DOMContentLoaded', aplicarEstiloInicial);
