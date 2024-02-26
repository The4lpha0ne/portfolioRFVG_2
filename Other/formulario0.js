// 1. Definición de la clase FormValidator
class FormValidator {
    // 2. CONSTRUCTOR de la clase
    constructor(formId) {
        // 3. Asigna el formulario a una propiedad de la clase
        this.form = document.getElementById(formId);
        // 4. Configura manejadores de eventos
        this.setupEventHandlers();
    }

    // 5. Método adicional para configurar manejador del botón 'Limpiar'
    setupResetEventHandler() {
        const resetButton = this.form.querySelector('input[type="reset"]');
        // 6. Si el botón existe, añade un evento de 'click'
        if (resetButton) {
            resetButton.addEventListener('click', (event) => this.handleReset(event));
        }
    }

    // 7. Método para manejar el clic en el botón 'Limpiar'
    handleReset(event) {
        // 8. Selecciona todos los campos de entrada del formulario
        const inputs = this.form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
        // 9. Comprueba si todos los campos están vacíos
        const allEmpty = Array.from(inputs).every(input => input.value === '');
        // 10. Si todos los campos están vacíos, muestra una alerta
        if (allEmpty) {
            alert('EL FORMULARIO YA ESTÁ VACÍO!!!');
            // 11. Impide que el formulario se limpie
            event.preventDefault();
        }
    } catch (error) {
        // 12. Manejo de cualquier error inesperado
        console.error('Error inesperado:', error);
        alert('Ocurrió un error al intentar limpiar el formulario.');
        event.preventDefault();
    }

    // 13. Método para configurar manejadores de eventos
    setupEventHandlers() {
        // 14. Asigna un manejador de eventos 'onsubmit' al formulario
        this.form.onsubmit = (event) => this.handleSubmit(event);
        // 15. Configura el manejador para el botón 'Limpiar'
        this.setupResetEventHandler();
        // 16. Añadir manejadores de eventos 'keyup' para cada campo de entrada
        this.form.querySelector('#nombre').addEventListener('keyup', () => this.validateNombreOnKeyup());
        this.form.querySelector('#tlf').addEventListener('keyup', () => this.validateTelefonoOnKeyup());
        this.form.querySelector('#email').addEventListener('keyup', () => this.validateEmailOnKeyup());
        this.form.querySelector('#mensaje').addEventListener('keyup', () => this.validateMensajeOnKeyup());
    }

    // 17. Métodos para validación individual en eventos 'keyup'
    validateNombreOnKeyup() {
        // 18. Obtiene el valor actual del campo 'nombre'
        var nombre = this.form.querySelector('#nombre').value;
        // 19. Valida el nombre si cumple ciertas condiciones
        if (nombre.length >= 3 || /\d/.test(nombre)) {
            this.validateNombre(nombre);
        }
    }

    validateTelefonoOnKeyup() {
        // 20. Obtiene el valor actual del campo 'teléfono'
        var telefono = this.form.querySelector('#tlf').value;
        // 21. Valida el teléfono si su longitud es al menos 9
        if (telefono.length >= 9) {
            this.validateTelefono(telefono);
        }
    }

    validateEmailOnKeyup() {
        // 22. Obtiene el valor actual del campo 'email'
        var email = this.form.querySelector('#email').value;
        // 23. Valida el email si termina en .com, .es, .org o .net
        if (/\.(com|es|org|net)$/.test(email)) {
            this.validateEmail(email);
        }
    }

    validateMensajeOnKeyup() {
        // 24. Obtiene el valor actual del campo 'mensaje'
        var mensaje = this.form.querySelector('#mensaje').value;
        // 25. Valida el mensaje si contiene contenido inapropiado
        if (/mierda|joder|coño/.test(mensaje.toLowerCase())) {
            alert('Por favor, no uses lenguaje inapropiado en tu mensaje.');
        }
    }

    // 26. Método para manejar la presentación del formulario
    handleSubmit(event) {
        // 27. Recupera y almacena los valores de los campos del formulario
        var nombre = document.getElementById('nombre').value;
        var telefono = document.getElementById('tlf').value;
        var email = document.getElementById('email').value;
        var mensaje = document.getElementById('mensaje').value;
        // 28. Realiza la validación de cada campo
        if (!this.validateNombre(nombre) || !this.validateTelefono(telefono) ||
            !this.validateEmail(email) || !this.validateMensajeLength(mensaje)) {
            // 29. Si alguna validación falla, previene el envío del formulario
            event.preventDefault();
            return false;
        }
        // 30. Si todas las validaciones son correctas, muestra un mensaje
        alert('EL FORMULARIO HA SIDO ENVIADO EXITOSAMENTE.');
        return true;
    }

    // 31. Método para validar el nombre usando una expresión regular
    validateNombre(nombre) {
        // 32. Define la expresión regular para el nombre
        var regexNombre = /^[a-zA-Z ]{3,}$/;
        var regexNumero = /\d/;
        // 33. Realiza la validación del nombre
        if ((nombre.length >= 3 && !regexNombre.test(nombre)) || regexNumero.test(nombre)) {
            alert('Por favor, ingresa un nombre válido. Solo letras y mínimo 3 caracteres sin números.');
            return false;
        }
        return true;
    }

    // 34. Método para validar el teléfono usando una expresión regular
    validateTelefono(telefono) {
        // 35. Define la expresión regular para el teléfono
        var regexTelefono = /^\+?[0-9]{9,15}$/;
        // 36. Realiza la validación del teléfono
        if (telefono.length >= 9 && !regexTelefono.test(telefono)) {
            alert('Por favor, ingresa un número de teléfono válido.');
            return false;
        }
        return true;
    }

    // 37. Método para validar el email usando una expresión regular
    validateEmail(email) {
        // 38. Define la expresión regular para el email
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 39. Realiza la validación del email
        if (!regexEmail.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return false;
        }
        return true;
    }

    // 40. Método para validar el mensaje (contenido inapropiado y longitud)
    validateMensajeLength(mensaje) {
        // 41. Verifica si el mensaje contiene palabras inapropiadas
        const palabrasInapropiadas = ["mierda", "joder", "coño"];
        const contienePalabraInapropiada = palabrasInapropiadas.some(palabra => mensaje.toLowerCase().includes(palabra));
        if (contienePalabraInapropiada) {
            // 42. Alerta si el mensaje contiene lenguaje inapropiado
            alert('Por favor, no uses lenguaje inapropiado en tu mensaje.');
            return false;
        }
        // 43. Verifica si el mensaje tiene al menos 10 caracteres
        if (mensaje.length < 10) {
            // 44. Alerta si el mensaje es demasiado corto
            alert('Por favor, escribe un mensaje más detallado. Debe tener al menos 10 caracteres.');
            return false;
        }
        return true;
    }
}

// 45. Creación de una instancia de FormValidator para el formulario con ID 'contactForm'
new FormValidator('contactForm');
