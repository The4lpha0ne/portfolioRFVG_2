<?php
// 1. Incluye el archivo de conexión a la base de datos
include("connection.php");

// 2. Establece una conexión con la base de datos
$con= connection();

// 3. Recupera el ID del usuario desde la URL
$id= $_GET['id'];

// 4. Prepara una consulta SQL para obtener los datos del usuario especificado
$sql= "SELECT * FROM users WHERE id='$id'";

// 5. Ejecuta la consulta en la base de datos
$result=mysqli_query($con,$sql);

// 6. Obtiene la fila de resultados como un arreglo asociativo
$row = mysqli_fetch_array($result);

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/styles.css" rel="stylesheet">
        <title>Editar usuarios</title>
    </head>
    <body>
        <div class="users-form">
            <form action="edit_user.php" method="POST" enctype="multipart/form-data">
                <h1>Actualiza el usuario</h1>
                <input type="hidden" name="id" value="<?= $row['id']?>">
                <input type="text" name="nombre" placeholder="Nombre" value="<?= $row['nombre']?>">

                <!-- Rol -->
                <select id="posicion" name="rol">
                    <option value="Top" <?= $row['rol'] == 'Top' ? 'selected' : '' ?>>Top</option>
                    <option value="Jungla" <?= $row['rol'] == 'Jungla' ? 'selected' : '' ?>>Jungle</option>
                    <option value="Medio" <?= $row['rol'] == 'Medio' ? 'selected' : '' ?>>Mid</option>
                    <option value="Bot" <?= $row['rol'] == 'Bot' ? 'selected' : '' ?>>Bot</option>
                    <option value="Support" <?= $row['rol'] == 'Support' ? 'selected' : '' ?>>Support</option>
                </select>

                <!-- Procedencia -->
                <select id="Procedencia" name="procedencia">
                    <option value="Demacia" <?= $row['procedencia'] == 'Demacia' ? 'selected' : '' ?>>Demacia</option>
                    <option value="Noxus" <?= $row['procedencia'] == 'Noxus' ? 'selected' : '' ?>>Noxus</option>
                    <option value="Ionia" <?= $row['procedencia'] == 'Ionia' ? 'selected' : '' ?>>Ionia</option>
                    <option value="Piltover" <?= $row['procedencia'] == 'Piltover' ? 'selected' : '' ?>>Piltover</option>
                    <option value="Zaun" <?= $row['procedencia'] == 'Zaun' ? 'selected' : '' ?>>Zaun</option>
                    <option value="Islas de las Sombras" <?= $row['procedencia'] == 'Islas de las Sombras' ? 'selected' : '' ?>>Islas de las Sombras</option>
                    <option value="Ciudad de Bandle" <?= $row['procedencia'] == 'Ciudad de Bandle' ? 'selected' : '' ?>>Ciudad de Bandle</option>
                </select>

                <!-- Recurso -->
                <select id="Recurso" name="recurso">
                    <option value="Mana" <?= $row['recurso'] == 'Mana' ? 'selected' : '' ?>>Mana</option>
                    <option value="Energia" <?= $row['recurso'] == 'Energia' ? 'selected' : '' ?>>Energia</option>
                    <option value="Furia" <?= $row['recurso'] == 'Furia' ? 'selected' : '' ?>>Furia</option>
                    <option value="Escudo" <?= $row['recurso'] == 'Escudo' ? 'selected' : '' ?>>Escudo</option>
                    <option value="Vida" <?= $row['recurso'] == 'Vida' ? 'selected' : '' ?>>Vida</option>
                    <option value="Ninguno" <?= $row['recurso'] == 'Ninguno' ? 'selected' : '' ?>>Ninguno</option>
                </select>

                <!-- Tipo de Golpe -->
                <select id="Tipo de golpe" name="golpe">
                    <option value="Cuerpo a cuerpo" <?= $row['golpe'] == 'Cuerpo a cuerpo' ? 'selected' : '' ?>>Cuerpo a cuerpo</option>
                    <option value="A distancia" <?= $row['golpe'] == 'A distancia' ? 'selected' : '' ?>>A distancia</option>
                </select>

                <input type="file" name="imagen" placeholder="Imagen" value="<?= $row['imagen']?>">
                <input type="submit" value="Actualizar informacion">
            </form>
        </div>
    </body>
</html>