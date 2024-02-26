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
        // 9. Limpia las clases de validación
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        // 10. Manejo opcional, como mostrar un mensaje, etc.
    }

    // 11. Método para configurar manejadores de eventos
    setupEventHandlers() {
        // 12. Asigna un manejador de eventos 'onsubmit' al formulario
        this.form.onsubmit = (event) => this.handleSubmit(event);
        // 13. Configura el manejador para el botón 'Limpiar'
        this.setupResetEventHandler();
        // 14. Añadir manejadores de eventos 'keyup' para cada campo de entrada
        const inputs = this.form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
        inputs.forEach(input => {
            input.addEventListener('keyup', () => this.validateField(input));
        });
    }

    // 15. Método para validar campos individualmente en eventos 'keyup'
    validateField(input) {
        const fieldId = input.id;
        let isValid = false;

        switch (fieldId) {
            case 'nombre':
                isValid = input.value.length >= 3 && !/\d/.test(input.value);
                break;
            case 'tlf':
                isValid = /^\d{9}$/.test(input.value);
                break;
            case 'email':
                isValid = /\S+@\S+\.\S+/.test(input.value);
                break;
            case 'mensaje':
                isValid = input.value.length > 10; // Ejemplo de validación
                break;
            default:
                console.error('Validación no configurada para: ', fieldId);
        }

        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }

    // 16. Método para manejar el envío del formulario
    handleSubmit(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Inicialización de variables para el estado de validación de cada campo
        let esNombreValido = false;
        let esEmailValido = false;
        let esPasswordValido = false;

        // Validación del nombre
        const validarNombre = () => {
        const nombre = document.getElementById('nombre').value;
        if(nombre.length > 2) {
            esNombreValido = true;
            document.getElementById('nombre').classList.remove('invalid');
            document.getElementById('nombre').classList.add('valid');
        } else {
            esNombreValido = false;
            document.getElementById('nombre').classList.remove('valid');
            document.getElementById('nombre').classList.add('invalid');
        }
        };

        // Validación del email
        const validarEmail = () => {
        const email = document.getElementById('email').value;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(regexEmail.test(email)) {
            esEmailValido = true;
            document.getElementById('email').classList.remove('invalid');
            document.getElementById('email').classList.add('valid');
        } else {
            esEmailValido = false;
            document.getElementById('email').classList.remove('valid');
            document.getElementById('email').classList.add('invalid');
        }
        };

        // Validación de la contraseña
        const validarPassword = () => {
        const password = document.getElementById('password').value;
        if(password.length >= 6) {
            esPasswordValido = true;
            document.getElementById('password').classList.remove('invalid');
            document.getElementById('password').classList.add('valid');
        } else {
            esPasswordValido = false;
            document.getElementById('password').classList.remove('valid');
            document.getElementById('password').classList.add('invalid');
        }
        };

        // Función para validar todos los campos y enviar el formulario
        const validarFormulario = () => {
        // Ejecuta todas las validaciones
        validarNombre();
        validarEmail();
        validarPassword();

        // Verifica si todos los campos son válidos antes de enviar
        if(esNombreValido && esEmailValido && esPasswordValido) {
            // Aquí puedes agregar tu lógica para enviar el formulario
            // Por ejemplo: enviarFormulario();
            console.log('Formulario enviado con éxito');
        } else {
            console.log('Verifica los campos del formulario');
        }
        };

        // Event listeners para la validación en tiempo real
        document.getElementById('nombre').addEventListener('input', validarNombre);
        document.getElementById('email').addEventListener('input', validarEmail);
        document.getElementById('password').addEventListener('input', validarPassword);

        // Event listener para el botón de enviar
        document.getElementById('enviar').addEventListener('click', validarFormulario);

        
        // Ejemplo: validar todos los campos antes del envío
        const inputs = this.form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
        let isFormValid = Array.from(inputs).every(input => input.classList.contains('valid'));

        if (isFormValid) {
            // Función para enviar el formulario
            const enviarFormulario = async () => {
                const datos = {
                  nombre: document.getElementById('nombre').value,
                  email: document.getElementById('email').value,
                  password: document.getElementById('password').value
                };
              
                await guardarDatosFormulario(datos);
                console.log('Formulario enviado y guardado en IndexedDB.');
            };              
            
            // Asegúrate de reemplazar 'URL_DEL_SERVIDOR_AQUI' con la URL real a la que necesitas enviar los datos del formulario
  
            console.log('Formulario válido, enviando datos...');
            this.showSuccessMessage(); // Suponiendo que esta función muestra un mensaje de éxito
        } else {
            console.error('Formulario inválido, revise los campos.');
            this.showErrorMessage(); // Suponiendo que esta función muestra un mensaje de error
        }

        const abrirDB = () => {
            return new Promise((resolve, reject) => {
                const solicitud = window.indexedDB.open('MiBaseDeDatos', 1);
          
                solicitud.onupgradeneeded = function(event) {
                    const db = event.target.result;

                    if (!db.objectStoreNames.contains('formularios')) {
                        db.createObjectStore('formularios', { keyPath: 'id', autoIncrement: true });
                    }
                };
          
                solicitud.onerror = function(event) {
                    reject('Error al abrir la base de datos: ' + event.target.errorCode);
                };
          
                solicitud.onsuccess = function(event) {
                    resolve(event.target.result);
                };
            });
        };
        
        const guardarDatosFormulario = async (datos) => {
            const db = await abrirDB();
            const tx = db.transaction('formularios', 'readwrite');
            const store = tx.objectStore('formularios');
            const solicitud = store.add(datos);
          
            solicitud.onsuccess = () => {
                console.log('Datos del formulario guardados con éxito.');
            };
          
            solicitud.onerror = (e) => {
                console.error('Error al guardar los datos del formulario: ', e.target.error);
            };
        };
          
    }

    // 17. Ejemplos de métodos para mostrar mensajes de éxito/error
    showSuccessMessage() {
        alert('Formulario enviado con éxito!');
    }

    showErrorMessage() {
        alert('Por favor, corrija los errores antes de enviar.');
    }
}

// 18. Instancia de FormValidator para el formulario de contacto
const contactFormValidator = new FormValidator('contactForm');
