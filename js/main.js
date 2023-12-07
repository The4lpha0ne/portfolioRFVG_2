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
        //5. Cambia el color del texto del elemento en 
        //'paragraph' a rojo.
        paragraph.style.color = 'red';
        //6. Cambia el color del texto en el elemento 
        //'heading' a #0021F3.
        heading.style.color = '#0021F3';
        //7. Cambia el cursor a un puntero cuando el 
        //ratón esté sobre el elemento 'heading'.
        heading.style.cursor = 'pointer';
        //8. Añade un atributo 'title' al elemento 
        //'heading'. Esto muestra un tooltip con el 
        //texto "Implementación de JavaScript" cuando 
        //el ratón esté sobre él.
        heading.setAttribute('title', 'Implementación de JavaScript');
    });

    //9. Añade un escuchador de eventos al elemento 
    //'heading' que se activará cuando el ratón ya no 
    //esté sobre él.
    heading.addEventListener('mouseout', function() {
        //10 Restablece el color del texto en 'paragraph' 
        //a su valor original.
        paragraph.style.color = '';
        //11. Restablece el color del texto en 'heading' 
        //a su valor original.
        heading.style.color = '';
        //12. Cambia el cursor de nuevo al valor 
        //predeterminado cuando el ratón ya no esté 
        //sobre el elemento 'heading'.
        heading.style.cursor = 'default';
        //13. Elimina el atributo 'title' del elemento 
        //'heading', lo que hace que el tooltip ya no 
        //se muestre cuando el ratón no esté sobre él.
        heading.removeAttribute('title');
    });
});
