// 1. Agrega un listener para ejecutar código cuando el 
// contenido del DOM esté completamente cargado.
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-preferencia");
    // 2. Intenta recuperar la preferencia actual desde 
    // localStorage y comprueba si estamos editando 
    // una existente
    const preferenciaActual = JSON.parse(localStorage.getItem('preferenciaActual'));
    const editando = preferenciaActual !== null;

    // 3. Si se está editando, precarga los valores de la 
    // preferencia actual en el formulario
    if (editando) {
        document.getElementById('nombre-preferencia').value = 
        preferenciaActual.nombre;

        document.getElementById('color-fondo').value = 
        preferenciaActual.colorFondo;

        document.getElementById('color-letra').value = 
        preferenciaActual.colorLetra;

        // Indica que el formulario está en modo edición
        document.getElementById('editando').value = 'true'; 
    }

    // 4. Agrega un listener al evento submit del formulario
    formulario.addEventListener("submit", function(event) {
        // Evita el comportamiento por defecto de enviar 
        // el formulario
        event.preventDefault();

        // 5. Recupera los valores ingresados por el usuario
        const nombre = 
        document.getElementById('nombre-preferencia').value;

        const colorFondo = 
        document.getElementById('color-fondo').value;

        const colorLetra = 
        document.getElementById('color-letra').value;

        const estaEditando = 
        document.getElementById('editando').value === 'true';

        // 6. Decide si guardar una nueva preferencia o 
        // actualizar una existente.
        if (estaEditando) {
            actualizarPreferencia(nombre, colorFondo, colorLetra);
        } 
        
        else {
            guardarPreferencia(nombre, colorFondo, colorLetra);
        }

        // 7. Reinicia el formulario y limpia la preferencia 
        // actual en localStorage, luego redirige.
        formulario.reset();
        localStorage.removeItem('preferenciaActual');
        window.location.href = 'preferencias.html';
    });
});

// 8. Función para guardar una nueva preferencia en 
// localStorage.
function guardarPreferencia(
    nombre, colorFondo, colorLetra
) {
    const preferencias = 
    JSON.parse(localStorage.getItem("preferencias")) || [];

    // 9. Se genera un nuevo ID único basado en el 
    // mayor ID existente + 1
    const nuevoId = 
    preferencias.length > 0 ? 
    Math.max(...preferencias.map(pref => pref.id)) + 1 : 1;

    // 10. Añade la nueva preferencia al arreglo.
    preferencias.push({ id: nuevoId, nombre, colorFondo, colorLetra });

    // 11. Guarda el arreglo actualizado en localStorage.
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
}

// 12. Función para actualizar una preferencia 
// existente.
function actualizarPreferencia(
    nombre, colorFondo, colorLetra
) {
    let preferencias = 
    JSON.parse(localStorage.getItem("preferencias"));

    const preferenciaActual = 
    JSON.parse(localStorage.getItem('preferenciaActual'));

    // 13. Encuentra el índice de la preferencia 
    // a actualizar.
    const index = 
    preferencias.findIndex(pref => pref.id === preferenciaActual.id);

    if (index !== -1) {
        // 14. Actualiza la preferencia con los 
        // nuevos valores.
        preferencias[index] = 
        { ...preferencias[index], nombre, colorFondo, colorLetra };

        // 15. Guarda el arreglo actualizado en 
        // localStorage.
        localStorage.setItem(
            "preferencias", 
            JSON.stringify(preferencias)
        );
    }
    
    else {
        // 16. Manejo de error en caso de no 
        // encontrar la preferencia.
        console.error(
            "Intentando actualizar una preferencia que no existe."
        );
    }
}

// Función para aplicar una preferencia de 
// estilo específica por su nombre.
function aplicarPreferencia(nombrePreferencia) {
    // Recupera las preferencias guardadas 
    // en localStorage y las convierte de JSON 
    // a un objeto de JavaScript.
    const preferencias = 
    JSON.parse(localStorage.getItem("preferencias"));

    // Encuentra la preferencia específica por su 
    // nombre dentro del arreglo de preferencias.
    const preferencia = 
    preferencias.find(pref => pref.nombre === nombrePreferencia);

    // Si la preferencia existe, aplica los 
    // estilos correspondientes.
    if (preferencia) {
        // Establece el color de fondo del cuerpo 
        // del documento al especificado en la 
        // preferencia.
        document.body.style.backgroundColor = preferencia.colorFondo;

        // Establece el color de texto del cuerpo 
        // del documento al especificado en la 
        // preferencia.
        document.body.style.color = preferencia.colorLetra;

        // Guarda la preferencia aplicada en 
        // localStorage para recordar la última 
        // preferencia de estilo aplicada.
        localStorage.setItem(
            "preferenciaAplicada", 
            JSON.stringify(preferencia)
        );
    }
}

// Función para aplicar el estilo inicial basado 
// en la última preferencia aplicada guardada.
function aplicarEstiloInicial() {
    // Recupera la última preferencia de estilo 
    // aplicada de localStorage y la convierte 
    // de JSON a un objeto de JavaScript.
    const preferenciaAplicada = 
    JSON.parse(localStorage.getItem("preferenciaAplicada"));

    // Si existe una preferencia aplicada 
    // previamente, aplica esos estilos.
    if (preferenciaAplicada) {
        // Establece el color de fondo del 
        // cuerpo del documento al especificado 
        // en la preferencia aplicada.
        document.body.style.backgroundColor = 
        preferenciaAplicada.colorFondo;

        // Establece el color de texto del 
        // cuerpo del documento al especificado 
        // en la preferencia aplicada.
        document.body.style.color = 
        preferenciaAplicada.colorLetra;
    }
}

// Llama a aplicarEstiloInicial cuando la 
// página se carga
document.addEventListener(
    'DOMContentLoaded', 
    aplicarEstiloInicial
);