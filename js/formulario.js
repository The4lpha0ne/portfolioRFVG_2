document.getElementById('contactForm').onsubmit = function(event) {
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('tlf').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;

    // Validación de nombre
    if (nombre.length < 3) {
        alert('Por favor, ingresa un nombre válido.');
        event.preventDefault();
        return false;
    }

    // Validación de teléfono (ejemplo básico, ajusta según necesidad)
    if (telefono.length < 9) {
        alert('Por favor, ingresa un número de teléfono válido.');
        event.preventDefault();
        return false;
    }

    // Validación de correo electrónico
    if (!email.includes('@')) {
        alert('Por favor, ingresa un correo electrónico válido.');
        event.preventDefault();
        return false;
    }

    // Validación de mensaje
    if (mensaje.length < 10) {
        alert('Por favor, escribe un mensaje más detallado.');
        event.preventDefault();
        return false;
    }

    // Si todo está correcto, el formulario se envía
    return true;
};
