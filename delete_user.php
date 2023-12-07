<?php
// 1. Incluye el archivo de conexión a la base de datos
include("connection.php");

// 2. Establece una conexión con la base de datos
$con = connection();

// 3. Recupera el ID del usuario desde la URL
$id = $_GET['id'];

// 4. Prepara una consulta SQL para obtener el nombre de la imagen del usuario
$sql = "SELECT imagen FROM users WHERE id='$id'";

// 5. Ejecuta la consulta en la base de datos
$imagen_result = mysqli_query($con, $sql);

// 6. Verifica si se encontró una imagen para el usuario
if ($imagen_row = mysqli_fetch_assoc($imagen_result)) {
    // 7. Obtiene el nombre de la imagen
    $imagen_nombre = $imagen_row['imagen'];

    // 8. Verifica si el archivo de imagen existe
    if ($imagen_nombre && file_exists("imagenes/" . $imagen_nombre)) {
        // 9. Elimina el archivo de imagen del servidor
        unlink("imagenes/" . $imagen_nombre);
    }
}

// 10. Prepara una consulta SQL para eliminar el usuario de la base de datos
$sql = "DELETE FROM users WHERE id='$id'";

// 11. Ejecuta la consulta de eliminación
$result = mysqli_query($con, $sql);

// 12. Redirige al usuario a la página principal si la eliminación es exitosa
if ($result) {
    Header("Location: index.php");
}
?>
