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
