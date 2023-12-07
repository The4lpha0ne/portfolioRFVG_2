<?php
// 1. Incluye el archivo de conexión a la base de datos
include("connection.php");

// 2. Establece una conexión con la base de datos
$con = connection();

// 3. Inicializa variables para ID e imagen
$id = null;
$nombreImagen = '';

// 4. Inicializa un arreglo para almacenar posibles errores
$errores = [];

// 5. Verifica si el formulario se ha enviado usando POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 6. Valida y asigna el valor de 'nombre'
    if (isset($_POST['nombre'])) {
        $name = $_POST['nombre'];
    } else {
        // 7. Maneja el caso de que nombre no esté definido
        $name = '';
    }

    // 8. Valida y asigna el valor de 'rol'
    if (isset($_POST['rol'])) {
        $lastname = $_POST['rol'];
    } else {
        $lastname = '';
        // 9. Maneja el caso de que rol no esté definido
    }

    // 10. Valida y asigna el valor de 'procedencia'
    if (isset($_POST['procedencia'])) {
        $username = $_POST['procedencia'];
    } else {
        // 11. Manejar el caso de que procedencia no esté definido
        $username = '';
    }

    // 12. Valida y asigna el valor de 'recurso'
    if (isset($_POST['recurso'])) {
        $password = $_POST['recurso'];
    } else {
        // 13. Manejar el caso de que recurso no esté definido
        $password = '';
        
    }

    // 14. Valida y asigna el valor de 'golpe'
    if (isset($_POST['golpe'])) {
        $email = $_POST['golpe'];
    } else {
        // 15. Manejar el caso de que golpe no esté definido
        $email = '';
    }

    // 16. Procesa la imagen subida
    $imagen = $_FILES['imagen'];
    $carpetaImagenes = './imagenes/';
    $nombreImagen = md5(uniqid(rand(), true)) . ".jpg";

    // 17. Crea la carpeta de imágenes si no existe
    if (!is_dir($carpetaImagenes)) {
        mkdir($carpetaImagenes);
    }

    // 18. Mueve la imagen subida al directorio deseado
    if (!move_uploaded_file($imagen['tmp_name'], $carpetaImagenes . $nombreImagen)) {
        // 19. Manejar el error, la imagen no se pudo mover al directorio objetivo
        echo "Error al cargar la imagen.";
    }

    // 20. Prepara una consulta SQL para insertar los datos
    $sql = "INSERT INTO users (nombre, rol, procedencia, recurso, golpe, imagen) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, 'ssssss', $name, $lastname, $username, $password, $email, $nombreImagen);
    $result = mysqli_stmt_execute($stmt);

    // 21. Redirige si la inserción es exitosa, de lo contrario muestra un error
    if ($result) {
        Header("Location: index.php?result=ok");
    } else {
        echo 'Error al insertar en la base de datos: ' . mysqli_error($con);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Usuarios Crud</title>
</head>
<body>
    <img src="./css/icono.png" class="icono">
    <div class="users-form">
        <form action="insert_user.php" method="POST" enctype="multipart/form-data">
            <input type="text" name="nombre" placeholder="Nombre">
            <select id="posicion" name="rol" aria-placeholder="Posicion">
                <option value="Top">Top</option>
                <option value="Jungla">Jungle</option>
                <option value="Medio">Mid</option>
                <option value="Bot">Bot</option>
                <option value="Support">Support</option>
            </select>
            <select id="Procedencia" name="procedencia" aria-placeholder="Procedencia">
                <option value="Demacia">Demacia</option>
                <option value="Noxus">Noxus</option>
                <option value="Ionia">Ionia</option>
                <option value="Piltover">Piltover</option>
                <option value="Zaun">Zaun</option>
                <option value="Islas de las Sombras">Islas de las Sombras</option>
                <option value="Ciudad de Bandle">Ciudad de Bandle</option>
            </select>
            <select id="Recurso" name="recurso" aria-placeholder="Recurso">
                <option value="Mana">Mana</option>
                <option value="Energia">Energia</option>
                <option value="Furia">Furia</option>
                <option value="Escudo">Escudo</option>
                <option value="Vida">Vida</option>
                <option value="Ninguno">Ninguno</option>
            </select>
            <select id="Tipo de golpe" name="golpe" aria-placeholder="Tipo de golpe">
                <option value="Cuerpo a cuerpo">Cuerpo a cuerpo</option>
                <option value="A distancia">A distancia</option>
            </select>
            <input type="file" id="imagen" name="imagen">
            <input type="submit" value="Agregar Campeon">
        </form>
    </div>
</body>
</html>
