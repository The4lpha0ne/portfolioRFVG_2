// 1. Manejador del evento 'onload' para gestionar el 
// consentimiento de cookies y la personalización del 
// nombre del usuario.
window.onload = () => {
    const path = window.location.pathname;

    // 2. Verifica si la página actual NO es preferencias.html
    if (!path.includes('preferencias.html')) {
        // 3. Solicita al usuario su consentimiento para 
        // el uso de cookies.
        const consentimientoCookies = 
        confirm(
            "Esta página utiliza cookies para mejorar tu experiencia. \n¿Aceptas el uso de cookies?"
        );
        
        // 4. Variable para almacenar el nombre del usuario.
        let nombreUsuario; 
        
        // 5. Verifica si el usuario aceptó el uso de cookies.
        if (consentimientoCookies) {
            // 6. Intenta recuperar el nombre del usuario de 
            // las cookies.
            nombreUsuario = getCookie("nombreUsuario");
            
            // 7. Si no se encuentra el nombre, pide al 
            // usuario que lo introduzca.
            if (!nombreUsuario) {
                nombreUsuario = 
                prompt("Por favor, introduzca su nombre:", "");

                if (nombreUsuario) {
                    // 8. Guarda el nombre del usuario en 
                    // las cookies por 7 días.
                    setCookie("nombreUsuario", nombreUsuario, 7); 
                }
            }

            // 9. Pide al usuario confirmar o cambiar el 
            // nombre.
            if (nombreUsuario) {
                let confirmarNombre = 
                confirm(`Eres <<<${nombreUsuario}>>>?`);
                // 10. Permite al usuario cambiar su nombre si la 
                // primera confirmación es negativa.
                while (!confirmarNombre) {
                    nombreUsuario = 
                    prompt("Por favor, introduzca su nombre:", "");
                    if (nombreUsuario) {
                        // 11. Actualiza el nombre del usuario 
                        // en las cookies por 7 días.
                        setCookie("nombreUsuario", nombreUsuario, 7);

                        confirmarNombre = 
                        confirm(`Eres <<<${nombreUsuario}>>>?`);
                    } else {
                        // 12. Si el usuario cancela el prompt, 
                        // sale del bucle.
                        break;
                    }
                }
            }
        }

        // 13. Prepara un mensaje que incluye la fecha y hora 
        // actual. Crea un objeto de fecha para obtener la fecha 
        // y hora actuales
        const now = new Date();

        // 14. Determina si es AM o PM basándose en la hora actual. 
        // Si la hora es mayor o igual a 12, asigna 'PM', de lo 
        // contrario, asigna 'AM'
        const amPm = now.getHours() >= 12 ? 'PM' : 'AM';

        // 15. Obtiene la hora en formato de 12 horas. Usa el 
        // módulo de 12 para convertir formatos de 24 a 12 
        // horas, ajustando las 0 horas a 12
        const hour = now.getHours() % 12 || 12;

        // 16. Obtiene los minutos actuales, asegurándose de que 
        // siempre tengan dos dígitos. Convierte los minutos a 
        // cadena y rellena con un '0' al inicio si es necesario 
        // para mantener el formato de dos dígitos
        const minutes = 
        now.getMinutes().toString().padStart(2, '0');

        // 17. Formatea la fecha y hora en un string legible.
        // Concatena día, mes, año y hora actual en el formato 
        // deseado, ajustando el mes sumando 1 ya que en 
        // JavaScript, los meses comienzan en 0.
        const dateString = 
        `${now.getDate()}/${now.getMonth() + 
            1}/${now.getFullYear()} a las ${hour}:${minutes} ${amPm}`;

        // 18. Muestra un mensaje de bienvenida personalizado 
        // con el nombre del usuario y la fecha actual.
        alert(
            `¡Bienvenido/a <<<${consentimientoCookies && nombreUsuario ? nombreUsuario : "Usuario"}>>>, a mi Proyecto Conjunto de DEW y DOR! \nHoy es ${dateString}.`
        );
    }
};

// 19. Define la función 'setCookie' para crear o 
// actualizar una cookie.
function setCookie(nombre, valor, diasExpiracion) {
    const d = new Date();

    // 20. Establece la fecha de expiración de la cookie.
    d.setTime(d.getTime() + 
    (diasExpiracion * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();
    // 21. Crea o actualiza la cookie.
    document.cookie = 
    nombre + "=" + valor + ";" + expires + ";path=/";
}

// 22. Define la función 'getCookie' para recuperar el 
// valor de una cookie.
function getCookie(nombre) {
    let nombreIgual = nombre + "=";

    // 23. Decodifica las cookies del documento.
    let decodedCookie = 
    decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');

    // 24. Busca la cookie por su nombre.
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(nombreIgual) == 0) {
            // 25. Devuelve el valor de la cookie 
            // encontrada.
            return c.substring(
                nombreIgual.length, c.length
            );
        }
    }

    // 26. Retorna una cadena vacía si la cookie no 
    // existe.
    return "";
}

function redireccionarAPreferencias() {
    let nombreUsuario = getCookie("nombreUsuario");
    
    // 27. Debido a que "preferencias.html" es la página 
    // que muestra el saludo y las preferencias, y 
    // "add_preferencia.html" es para añadir una nueva 
    // preferencia
    let destino = 
    nombreUsuario ? 
    "./preferencias/preferencias.html" : 
    "./preferencias/add_preferencia.html";

    window.location.href = destino;
}
