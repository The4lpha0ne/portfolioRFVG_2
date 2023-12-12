//1. Añade un escuchador al documento para asegurarse de 
//que el script se ejecute solo después de que todo el 
//contenido del DOM esté cargado.
document.addEventListener("DOMContentLoaded", function() {
    //2. Busca el elemento con la clase 'about_me2' en 
    //el DOM y lo guarda en la variable 'heading'.
    const heading = document.querySelector('.about_me2');
    //3. Busca el elemento con la clase 'description1' 
    //en el DOM y lo guarda en la variable 'paragraph'.
    const paragraph = document.querySelector('.description1');

    //4. Añade un escuchador de eventos al elemento 
    //'heading' que se activará cuando el ratón 
    //esté sobre él.
    heading.addEventListener('mouseover', function() {
        paragraph.style.color = 'red';
        heading.style.color = '#0021F3';
        heading.style.cursor = 'pointer';
        heading.setAttribute(
            'title', 'Implementación de JavaScript 1'
        );
    });

    //5. Añade un escuchador de eventos al elemento 
    //'heading' que se activará cuando el ratón ya no 
    //esté sobre él.
    heading.addEventListener('mouseout', function() {
        //6. Restablece el color del texto en 'paragraph' 
        //a su valor original.
        paragraph.style.color = '';
        //7. Restablece el color del texto en 'heading' 
        //a su valor original.
        heading.style.color = '';
        //8. Cambia el cursor de nuevo al valor 
        //predeterminado cuando el ratón ya no esté 
        //sobre el elemento 'heading'.
        heading.style.cursor = 'default';
        //9. Elimina el atributo 'title' del elemento 
        //'heading', lo que hace que el tooltip ya no 
        //se muestre cuando el ratón no esté sobre él.
        heading.removeAttribute('title');
    });
});

// 10. Define un manejador para el evento 'onload' en la 
// ventana
window.onload = function() {
    // 11. Muestra un mensaje de alerta cuando la página 
    // se carga completamente
    alert(
        '¡Bienvenidos/as a mi Proyecto Conjunto de ' + 
        'DEW y DOR para el primer Trimestre!'
    );
};
