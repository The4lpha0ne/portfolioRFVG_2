<?php
// 1. Incluye el archivo de conexión a la base de datos
include("connection.php");

// 2. Establece una conexión con la base de datos
$con = connection();

// 3. Recupera el ID y otros datos del formulario
$id = $_POST["id"];
$name = $_POST['nombre'];
$lastname = $_POST['rol'];
$username = $_POST['procedencia'];
$password = $_POST['recurso'];
$email = $_POST['golpe'];

// 4. Obtiene el nombre de la imagen actual asociada al usuario
$sql = "SELECT imagen FROM users WHERE id='$id'";
$imagen_actual_result = mysqli_query($con, $sql);
$imagen_actual_nombre = '';
if ($imagen_actual_row = mysqli_fetch_assoc($imagen_actual_result)) {
    $imagen_actual_nombre = $imagen_actual_row['imagen'];
}

// 5. Procesa la imagen subida
$imagen=$_FILES['imagen'];
$carpetaImagenes='./imagenes/';

// 6. Genera un nombre único para la nueva imagen
$nombreImagen=md5(uniqid(rand(),true)).'.jpg';

// 7. Verifica si el directorio para las imágenes existe, si no, lo crea
if (!is_dir($carpetaImagenes)){
    mkdir($carpetaImagenes);
}

// 8. Comprueba si no hay errores en la carga de la imagen
if ($imagen['error'] == UPLOAD_ERR_OK) {
    // 9. Subir la nueva imagen
    $nombreImagen=md5(uniqid(rand(),true)).'.jpg';
    move_uploaded_file($imagen['tmp_name'], $carpetaImagenes.$nombreImagen);

    // 10. Eliminar la imagen anterior si es diferente de la nueva
    if ($imagen_actual_nombre && $imagen_actual_nombre != $nombreImagen && file_exists($carpetaImagenes.$imagen_actual_nombre)) {
        unlink($carpetaImagenes.$imagen_actual_nombre);
    }
} else {
    // 11. Si no hay una nueva imagen, mantener la imagen actual
    $nombreImagen = $imagen_actual_nombre;
}

// 12. Verifica si la carga de la imagen fue exitosa
if ($imagen['error'] == UPLOAD_ERR_OK) {
    // 13. Mueve la imagen subida al directorio especificado
    move_uploaded_file($imagen['tmp_name'], $carpetaImagenes.$nombreImagen);
} else {
    // 14. Maneja el caso de error en la carga de la imagen
    echo 'Error en la carga de la imagen.';
    $nombreImagen = '';
}

// 15. Actualiza los datos del usuario en la base de datos
$sql = "UPDATE users SET nombre='$name' WHERE id='$id'";
$result = mysqli_query($con, $sql);

$sql = "UPDATE users SET rol='$lastname' WHERE id='$id'";
$result = mysqli_query($con, $sql);

$sql = "UPDATE users SET procedencia='$username' WHERE id='$id'";
$result = mysqli_query($con, $sql);

$sql = "UPDATE users SET recurso='$password' WHERE id='$id'";
$result = mysqli_query($con, $sql);

$sql = "UPDATE users SET golpe='$email' WHERE id='$id'";
$result = mysqli_query($con, $sql);

// 16. Actualiza la imagen si es necesario
if ($nombreImagen !== '') {
    $sql = "UPDATE users SET imagen='$nombreImagen' WHERE id='$id'";
    $result = mysqli_query($con, $sql);
}

// 17. Redirige al usuario a la página principal si la actualización es exitosa
if ($result) {
    Header("Location: index.php");
}
?>
