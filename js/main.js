// 1. Define la clase Aplicacion (Objeto y Constructor): 
// Establece una plantilla para crear objetos Aplicacion.
class Aplicacion {
    constructor() {
        // 2. Inicializa propiedades para elementos del DOM 
        // (Uso del DOM): Almacena referencias a elementos 
        // HTML.
        this.heading = null;
        this.paragraph = null;
    }

    // 3. Método para inicializar la aplicación (Uso del DOM): 
    // Encuentra y asigna elementos del DOM a propiedades.
    iniciar() {
        this.heading = document.querySelector(
            '.about_me2'
        );

        this.paragraph = document.querySelector(
            '.description1'
        );

        // 4. Llama al método para añadir escuchadores de 
        // eventos.
        this.inicializarEventos();
    }

    // 5. Método para añadir escuchadores de eventos 
    // (Funciones Flecha): Asigna funciones anónimas flecha 
    // a eventos.
    inicializarEventos() {
        // Funciones Flecha para eventos 'mouseover' y 
        // 'mouseout'.
        this.heading.addEventListener(
            'mouseover', () => this.onMouseOver()
        );

        this.heading.addEventListener(
            'mouseout', () => this.onMouseOut()
        );
    }

    // 6. Método onMouseOver (Manipulación del DOM): 
    // Cambia estilos y atributos del elemento al pasar el 
    // ratón.
    onMouseOver() {
        this.paragraph.style.color = 'red';
        this.heading.style.color = '#0021F3';
        this.heading.style.cursor = 'pointer';
        this.heading.setAttribute(
            'title', 
            'Implementación de JavaScript 1'
        );
    }

    // 7. Método onMouseOut (Manipulación del DOM): 
    // Restablece estilos y atributos al quitar el ratón.
    onMouseOut() {
        this.paragraph.style.color = '';
        this.heading.style.color = '';
        this.heading.style.cursor = 'default';
        this.heading.removeAttribute('title');
    }
}

// 8. Inicialización de la aplicación 
// (Función Flecha y DOM): Ejecuta la aplicación cuando 
// el DOM está listo.
document.addEventListener("DOMContentLoaded", () => {
    const miApp = new Aplicacion();
    miApp.iniciar();
});

// 9. Manejador evento 'onload' (Función Flecha, Manejo 
// de String y Alert): Muestra un mensaje al cargar la 
// página.
window.onload = () => {
    // 10. Crea un mensaje (Manejo de String): Formatea la 
    // fecha y hora actual en un string.
    const now = new Date();

    const amPm = now.getHours() >= 12 ? 'PM' : 'AM';

    const hour = now.getHours() % 12 || 12;

    const minutes = now.getMinutes().toString().padStart(2, '0');

    const dateString = 
    `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} a las ${hour}:${minutes} ${amPm}`;

    // 11. Muestra un mensaje de alerta (Alert): Usa 
    // 'alert' para mostrar el mensaje formateado.
    alert(
        `¡Bienvenidos/as a mi Proyecto Conjunto de DEW y DOR para el primer Trimestre! Es ${dateString}.`
    );
};

//document.addEventListener("DOMContentLoaded", function() {

    //heading.addEventListener('mouseover', function() {

    //heading.addEventListener('mouseout', function() {
    
//window.onload = function() {