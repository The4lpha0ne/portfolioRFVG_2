// 1. Manejador del evento 'onload' para gestionar el 
// consentimiento de cookies y la personalización del 
// nombre del usuario.
window.onload = () => {
    // 2. Solicita al usuario su consentimiento para 
    // el uso de cookies.
    const consentimientoCookies = 
    confirm("Esta página utiliza cookies para mejorar tu experiencia. \n¿Aceptas el uso de cookies?");
    
    // 3. Variable para almacenar el nombre del usuario.
    let nombreUsuario; 
    
    // 4. Verifica si el usuario aceptó el uso de cookies.
    if (consentimientoCookies) {
        // 5. Intenta recuperar el nombre del usuario de 
        // las cookies.
        nombreUsuario = getCookie("nombreUsuario");
        
        // 6. Si no se encuentra el nombre, pide al 
        // usuario que lo introduzca.
        if (!nombreUsuario) {
            nombreUsuario = 
            prompt("Por favor, introduzca su nombre:", "");

            if (nombreUsuario) {
                // 7. Guarda el nombre del usuario en 
                // las cookies por 7 días.
                setCookie("nombreUsuario", nombreUsuario, 7); 
            }
        }

        // 8. Pide al usuario confirmar o cambiar el 
        // nombre.
        if (nombreUsuario) {
            let confirmarNombre = 
            confirm(`Eres <<<${nombreUsuario}>>>?`);
            // 9. Permite al usuario cambiar su nombre si la 
            // primera confirmación es negativa.
            while (!confirmarNombre) {
                nombreUsuario = 
                prompt("Por favor, introduzca su nombre:", "");
                if (nombreUsuario) {
                    // 10. Actualiza el nombre del usuario 
                    // en las cookies por 7 días.
                    setCookie("nombreUsuario", nombreUsuario, 7);

                    confirmarNombre = 
                    confirm(`Eres <<<${nombreUsuario}>>>?`);
                } else {
                    // 11. Si el usuario cancela el prompt, 
                    // sale del bucle.
                    break;
                }
            }
        }
    }

    // 12. Prepara un mensaje que incluye la fecha y hora 
    // actual.
    const now = new Date();
    const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
    const hour = now.getHours() % 12 || 12;

    const minutes = 
    now.getMinutes().toString().padStart(2, '0');

    const dateString = 
    `${now.getDate()}/${now.getMonth() + 
        1}/${now.getFullYear()} a las ${hour}:${minutes} ${amPm}`;

    // 13. Muestra un mensaje de bienvenida personalizado 
    // con el nombre del usuario y la fecha actual.
    alert(`¡Bienvenido/a <<<${consentimientoCookies && nombreUsuario ? nombreUsuario : "Usuario"}>>>, a mi Proyecto Conjunto de DEW y DOR! \nHoy es ${dateString}.`);
};

// 14. Define la función 'setCookie' para crear o 
// actualizar una cookie.
function setCookie(nombre, valor, diasExpiracion) {
    const d = new Date();

    // 15. Establece la fecha de expiración de la cookie.
    d.setTime(d.getTime() + 
    (diasExpiracion * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();
    // 16. Crea o actualiza la cookie.
    document.cookie = 
    nombre + "=" + valor + ";" + expires + ";path=/";
}

// 17. Define la función 'getCookie' para recuperar el 
// valor de una cookie.
function getCookie(nombre) {
    let nombreIgual = nombre + "=";

    // 18. Decodifica las cookies del documento.
    let decodedCookie = 
    decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');

    // 19. Busca la cookie por su nombre.
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(nombreIgual) == 0) {
            // 20. Devuelve el valor de la cookie 
            // encontrada.
            return c.substring(nombreIgual.length, c.length);
        }
    }

    // 21. Retorna una cadena vacía si la cookie no 
    // existe.
    return "";
}
