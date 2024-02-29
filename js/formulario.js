$(document).ready(function() { 
    // 1. Inicialización de IndexedDB
    let db;

    // 2. Definición de la función openDatabase con promesas
    function openDatabase() {
        // 3. Devuelve una nueva promesa que encapsula la 
        // operación asincrónica de abrir la base de datos
        return new Promise((resolve, reject) => {
            // 4. Intenta abrir una base de datos llamada 
            // 'formularioDB' con la versión 1
            const request = 
            window.indexedDB.open('formularioDB', 1);

            // 5. Este evento se dispara si la base de datos 
            // necesita ser creada o actualizada a una nueva 
            // versión
            request.onupgradeneeded = (event) => {
                // 6. Accede a la base de datos creada o 
                // actualizada
                const db = event.target.result;

                // 7. Verifica si ya existe un almacén de 
                // objetos llamado 'formularios'
                if (!db.objectStoreNames.contains('formularios')) {
                    // 8. Crea un nuevo almacén de objetos 
                    // 'formularios' con un 'id' 
                    // autoincrementable como clave primaria
                    const store = 
                    db.createObjectStore(
                        'formularios', 
                        { keyPath: 'id', autoIncrement: true }
                    );

                    // 9. Crea un índice llamado 'nombre' para 
                    // facilitar la búsqueda por este campo, 
                    // permitiendo duplicados (unique: false)
                    store.createIndex(
                        'nombre', 'nombre', { unique: false }
                    );
                }
            };

            // 10. Este evento se dispara cuando la base de 
            // datos se ha abierto con éxito
            request.onsuccess = (event) => {
                // 11. Se asigna la base de datos abierta a 
                // la variable db
                db = event.target.result;
                // 12. Resuelve la promesa con la base de 
                // datos como valor
                resolve(db);
            };

            // 13.Este evento se dispara si hay un error al 
            // abrir la base de datos
            request.onerror = (event) => {
                // 14. Rechaza la promesa con un objeto Error 
                // que contiene información sobre el error
                reject(new Error(
                    `Error al abrir la base de datos: ${event.target.errorCode}`
                ));
            };
        });
    }

    // 15. Confirmación de IndexDB. Esta función se ejecuta 
    // al cargar la página que intenta abrir la base de 
    // datos y maneja el resultado
    window.onload = function() {
        // Llama a openDatabase y maneja la promesa resultante
        openDatabase().then((db) => {
            // Registra en consola el éxito al abrir la base 
            // de datos
            console.log(
                'Base de datos abierta exitosamente', db
            );
        }).catch((error) => {
            // Registra en consola el error si la base de 
            // datos no puede abrirse
            console.error(
                'Error al abrir la base de datos', error
            );
        });
    };

    // 16. Definición de la clase FormValidator
    class FormValidator {
        // 17. CONSTRUCTOR de la clase
        constructor(formId) {
            // 18. Asigna el formulario a una propiedad 
            // de la clase
            this.form = document.getElementById(formId);
            // 19. Configura manejadores de eventos
            this.setupEventHandlers();
            // Vincula el contexto 'this' al método 
            // 'handleSubmit'
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        // 20. Método adicional para configurar manejador 
        // del botón 'Limpiar'
        setupResetEventHandler() {
            const resetButton = 
            this.form.querySelector('input[type="reset"]');

            // 21. Si el botón existe, añade un evento de 
            // 'click'
            if (resetButton) {
                resetButton.addEventListener(
                    'click', (event) => this.handleReset(event)
                );
            }
        }

        // handleReset(event) {
        //     try {
        //         const inputs = 
        //         this.form.querySelectorAll(
        //             'input[type="text"], input[type="tel"], input[type="email"], textarea'
        //         );

        //         const allEmpty = 
        //         Array.from(inputs).every(
        //             input => input.value === ''
        //         );

        //         if (allEmpty) {
        //             alert('EL FORMULARIO YA ESTÁ VACÍO!!!');
        //             event.preventDefault();
        //         }
        //     } 
            
        //     catch (error) {
        //         console.error('Error inesperado:', error);
        //         alert(
        //             'Ocurrió un error al intentar limpiar el formulario.'
        //         );
        //         event.preventDefault();
        //     }
        // }        

        handleReset(event) {
            try {
                const inputs = 
                this.form.querySelectorAll(
                    'input[type="text"], input[type="tel"], input[type="email"], textarea'
                );
                
                // Se asume inicialmente que todos los campos están vacíos
                let allEmpty = true; 
        
                // Se usa forEach para iterar sobre cada input y comprobar 
                // si alguno tiene contenido
                Array.from(inputs).forEach(input => {
                    if (input.value !== '') {
                        // Si se encuentra un campo no vacío, se cambia 
                        // allEmpty a false
                        allEmpty = false; 
                    }
                });
        
                if (allEmpty) {
                    alert('EL FORMULARIO YA ESTÁ VACÍO!!!');
                    event.preventDefault();
                }
            } 
            
            catch (error) {
                console.error('Error inesperado:', error);
                alert('Ocurrió un error al intentar limpiar el formulario.');
                event.preventDefault();
            }
        }
        

        // 28. Método para configurar manejadores de eventos
        setupEventHandlers() {
            // 29. Asigna un manejador de eventos 'onsubmit' 
            // al formulario
            this.form.onsubmit = 
            (event) => this.handleSubmit(event);

            // 30. Configura el manejador para el botón 
            // 'Limpiar'
            this.setupResetEventHandler();

            // 31. Añade manejadores de eventos 'keyup' para 
            // cada campo de entrada
            this.form.querySelector(
                '#nombre'
            ).addEventListener(
                'keyup', () => this.validateNombreOnKeyup()
            );

            this.form.querySelector(
                '#tlf'
            ).addEventListener(
                'keyup', () => this.validateTelefonoOnKeyup()
            );

            this.form.querySelector(
                '#email'
            ).addEventListener(
                'keyup', () => this.validateEmailOnKeyup()
            );

            this.form.querySelector(
                '#mensaje'
            ).addEventListener(
                'keyup', () => this.validateMensajeOnKeyup()
            );
        }

        // 32. Métodos para validación individual en 
        // eventos 'keyup'
        validateNombreOnKeyup() {
            // 33. Obtiene el valor actual del campo 
            // 'nombre'
            var nombre = 
            this.form.querySelector('#nombre').value;

            // 34. Valida el nombre si cumple ciertas 
            // condiciones
            if (nombre.length >= 3 || /\d/.test(nombre)) {
                this.validateNombre(nombre);
            }
        }

        validateTelefonoOnKeyup() {
            // 35. Obtiene el valor actual del campo 
            // 'teléfono'
            var telefono = 
            this.form.querySelector('#tlf').value;

            // 36. Modifica la validación para que utilice 
            // la expresión regular desde el principio
            var regexTelefono = /^\+?[0-9]{9,15}$/;
            if (telefono.length >= 9 && 
                regexTelefono.test(telefono)
            ) {
                this.validateTelefono(telefono);
            }
        }

        validateEmailOnKeyup() {
            // 37. Obtiene el valor actual del campo 
            // 'email'
            var email = 
            this.form.querySelector('#email').value;

            // 38. Valida el email si termina en .com, 
            // .es, .org o .net
            if (/\.(com|es|org|net)$/.test(email)) {
                this.validateEmail(email);
            }
        }

        validateMensajeOnKeyup() {
            // 39. Obtiene el valor actual del campo 'mensaje'
            var mensaje = 
            this.form.querySelector('#mensaje').value;

            // 40. Valida el mensaje si contiene contenido 
            // inapropiado
            if (
                /mierda|joder|puta|coño/.test(
                    mensaje.toLowerCase()
                )
            ) {
                alert(
                    'Por favor, no uses lenguaje inapropiado en tu mensaje.'
                );
            }
        }

        // 47. Método para validar el nombre usando una expresión 
        // regular
        validateNombre(nombre) {
            // 48. Define la expresión regular para el nombre
            var regexNombre = /^[a-zA-Z ]{3,}$/;
            var regexNumero = /\d/;

            // 49. Realiza la validación del nombre
            if (
                (nombre.length >= 3 && !regexNombre.test(nombre)) || 
                regexNumero.test(nombre)
            ) {
                alert(
                    'Por favor, ingresa un nombre válido. Solo letras y mínimo 3 caracteres sin números.'
                );
                return false;
            }
            return true;
        }

        validateTelefono(telefono) {
            // 50. Mantiene la expresión regular para el 
            // teléfono
            var regexTelefono = /^\+?[0-9]{9,15}$/;

            // 51. La validación del teléfono permanece igual, 
            // asegurando que se cumpla el formato
            if (!regexTelefono.test(telefono)) {
                alert(
                    'Por favor, ingresa un número de teléfono válido.'
                );
                return false;
            }
            return true;
        }

        // 52. Método para validar el email usando una 
        // expresión regular
        validateEmail(email) {
            // 53. Define la expresión regular para el email
            var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // 54. Realiza la validación del email
            if (!regexEmail.test(email)) {
                alert(
                    'Por favor, ingresa un correo electrónico válido.'
                );
                return false;
            }
            return true;
        }

        // 55. Método para validar el mensaje (contenido 
        // inapropiado y longitud)
        validateMensajeLength(mensaje) {
            // 56. Verifica si el mensaje contiene palabras 
            // inapropiadas
            const palabrasInapropiadas = 
            ["mierda", "joder", "puta", "coño"];

            const contienePalabraInapropiada = 
            palabrasInapropiadas.some(
                palabra => mensaje.toLowerCase().includes(palabra)
            );

            if (contienePalabraInapropiada) {
                // 57. Alerta si el mensaje contiene lenguaje 
                // inapropiado
                alert(
                    'Por favor, no uses lenguaje inapropiado en tu mensaje.'
                );
                return false;
            }

            // 58. Verifica si el mensaje tiene al menos 10 
            // caracteres
            if (mensaje.length < 10) {
                // 59. Alerta si el mensaje es demasiado corto
                alert(
                    'Por favor, escribe un mensaje más detallado. Debe tener al menos 10 caracteres.'
                );
                return false;
            }
            return true;
        }

        // 60. Función para almacenar los datos del formulario 
        // en IndexedDB
        storeFormData(formData) {
            // 61. Inicia una transacción de lectura/escritura 
            // en la base de datos para el almacenamiento 
            // 'formularios'
            let transaction = 
            db.transaction(['formularios'], 'readwrite');

            // 62. Accede al almacenamiento de objetos 
            // 'formularios' dentro de la transacción
            let store = transaction.objectStore('formularios');

            // 63. Crea una solicitud para añadir los datos 
            // del formulario al almacenamiento de objetos
            let request = store.add(formData);
        
            // 64. Gestiona el evento de éxito de la 
            // solicitud
            request.onsuccess = () => {
                // 65. Imprime un mensaje de éxito en la 
                // consola
                console.log(
                    'Datos del formulario almacenados correctamente.'
                );
            };
        
            // 66. Gestiona el evento de error de la solicitud
            request.onerror = (e) => {
                // 67. Imprime un mensaje de error en la consola 
                // si ocurre un problema al almacenar los datos
                console.error(
                    'Error al almacenar los datos del formulario:', 
                    e.target.error
                );
            };
        } 

        handleSubmit(event) {
            // Previene el comportamiento por defecto para 
            // tener control total sobre la validación y el 
            // envío.
            event.preventDefault();

            // Recupera y almacena los valores de los campos 
            // del formulario
            var nombre = document.getElementById('nombre').value;
            var telefono = document.getElementById('tlf').value;
            var email = document.getElementById('email').value;
            var mensaje = document.getElementById('mensaje').value;

            // Realiza la validación de cada campo
            if (this.validateNombre(nombre) && 
                this.validateTelefono(telefono) && 
                this.validateEmail(email) && 
                this.validateMensajeLength(mensaje)
            ) {
                // Si todas las validaciones son correctas, 
                // se procede a almacenar los datos en IndexedDB
                this.storeFormData(
                    {nombre, telefono, email, mensaje}
                );

                // Preparación de los datos del formulario para 
                // el envío
                var formData = 
                new FormData(
                    document.getElementById('contactForm')
                );
                
                // Envía los datos del formulario a 
                // 'enviarCorreo.php' usando fetch
                fetch('enviarCorreo.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    // Manejo de la respuesta del servidor
                    alert(
                        "EL FORMULARIO HA SIDO ENVIADO Y ALMACENADO EXITOSAMENTE. "
                    );
                    alert(data);
                })
                .catch((error) => {
                    // Manejo de errores durante el envío
                    console.error('Error:', error);
                    alert(
                        "Ocurrió un error al enviar el mensaje al correo escrito."
                    );
                });
            } 
            
            else {
                // Si alguna validación falla, muestra un 
                // mensaje de error y termina la función
                alert('ERROR');
                return false;
            }
        }
    }

    // Creación de una instancia de FormValidator para 
    // el formulario con ID 'contactForm'
    new FormValidator('contactForm');
    // const myFormValidator = new FormValidator('contactForm');

    // Añades el manejador de eventos al formulario, 
    // usando la instancia de tu clase.
    // document.getElementById('contactForm').addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     myFormValidator.handleSubmit(event);
    // });

    // function setupjQueryAnimations() {
    //     $('input[type="reset"]').click(function(event) {

    //         var isFormEmpty = 
    //         $('#nombre').val() === '' && $('#tlf').val() === 
    //         '' && $('#email').val() === 
    //         '' && $('#mensaje').val() === '';

    //         if (!isFormEmpty) {

    //             $(this).animate({
    //                 opacity: 0.5,
    //                 height: "+=10",
    //                 width: "+=10"
    //             }, 500).css({

    //                 transform: 'rotate(10deg)' 
    //             });
    

    //             setTimeout(() => {
    //                 $(this).animate({
    //                     opacity: 1, 

    //                     height: "-=10", 

    //                     width: "-=10" 
    //                 }, 500).css({

    //                     transform: 'rotate(0deg)' 
    //                 });
    //             }, 500);
    //         } 
            
    //         else {
    //             alert('EL FORMULARIO YA ESTÁ VACÍO!!!');
    //             event.preventDefault();
    //         }
    //     });
    // }

    function setupjQueryAnimations() {
        $('input[type="reset"]').click(function(event) {
            // Comprobación si el formulario está vacío antes de resetear
            var isFormEmpty = 
            $('#nombre').val() === '' && $('#tlf').val() === '' &&
            $('#email').val() === '' && $('#mensaje').val() === '';
    
            if (!isFormEmpty) {
                // Animación para el botón reset: cambio de opacidad, tamaño y rotación
                $(this).animate({
                    opacity: 0.5,
                    height: "+=10",
                    width: "+=10"
                }, 500).css({
                    transform: 'rotate(10deg)' // Rota el botón 10 grados
                });
    
                // Vuelve a la opacidad original, al tamaño y a la rotación original después de la animación
                setTimeout(() => {
                    $(this).animate({
                        opacity: 1,
                        height: "-=10",
                        width: "-=10"
                    }, 500).css({
                        transform: 'rotate(0deg)' // Restablece la rotación
                    });
    
                    // Realiza la llamada Ajax después de la animación
                    $.ajax({
                        url: 'enviarCorreo.php', // URL del servidor que procesa la petición
                        type: 'POST', // Método HTTP utilizado para la petición
                        data: {
                            // Envía los datos necesarios para la verificación o acción en el servidor
                            nombre: $('#nombre').val(),
                            tlf: $('#tlf').val(),
                            email: $('#email').val(),
                            mensaje: $('#mensaje').val()
                        },
                        success: function(response) {
                            console.log('La llamada Ajax funcionó.');
                        },
                        error: function() {
                            alert(
                                'Error (solo con Ajax, no es problema ' + 
                                'cuando se utiliza XAMPP) al comunicarse ' + 
                                'con el servidor.'
                            );
                        }
                    });
                }, 500);
            } 
            
            else {
                // El formulario está vacío, muestra una alerta
                // alert('EL FORMULARIO YA ESTÁ VACÍO!!!');
                event.preventDefault();
            }
        });
    }
    
    // 77. Llama a la función setupjQueryAnimations una vez 
    // que el documento está listo
    setupjQueryAnimations();
});