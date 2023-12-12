// 1. Asigna un manejador de eventos 'onsubmit' al formulario con ID 'contactForm'
document.getElementById('contactForm').onsubmit = function(event) {
    // 2. Recupera y almacena el valor del campo 'nombre' del formulario
    var nombre = document.getElementById('nombre').value;

    // 3. Recupera y almacena el valor del campo 'teléfono' del formulario
    var telefono = document.getElementById('tlf').value;

    // 4. Recupera y almacena el valor del campo 'email' del formulario
    var email = document.getElementById('email').value;

    // 5. Recupera y almacena el valor del campo 'mensaje' del formulario
    var mensaje = document.getElementById('mensaje').value;

    // 6. Valida el nombre usando una expresión regular (al menos 3 caracteres, solo letras)
    var regexNombre = /^[a-zA-Z]{3,}$/;
    if (!regexNombre.test(nombre)) {
        alert('Por favor, ingresa un nombre válido. Solo letras y mínimo 3 caracteres.');
        event.preventDefault();
        return false;
    }

    // 7. Valida el teléfono usando una expresión regular (formato internacional)
    var regexTelefono = /^\+?[0-9]{9,15}$/;
    if (!regexTelefono.test(telefono)) {
        alert('Por favor, ingresa un número de teléfono válido.');
        event.preventDefault();
        return false;
    }

    // 8. Valida el correo electrónico usando una expresión regular
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        event.preventDefault();
        return false;
    }

    // 9. Realiza la validación del mensaje: verifica si tiene menos de 10 caracteres
    if (mensaje.length < 10) {
        alert('Por favor, escribe un mensaje más detallado.');
        event.preventDefault();
        return false;
    }

    // 10. Si todas las validaciones son correctas, permite el envío del formulario
    return true;
};
