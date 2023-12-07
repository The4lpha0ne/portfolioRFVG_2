<?php
// 1. Incluye el archivo de conexión a la base de datos
include("connection.php");

// 2. Establece una conexión con la base de datos
$con= connection();

// 3. Prepara una consulta SQL para obtener todos los usuarios
$sql= "SELECT * FROM users";

// 4. Ejecuta la consulta en la base de datos
$result=mysqli_query($con,$sql);
?>

<!DOCTYPE html>
<html lang="en">        
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios Crud</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <img src="./css/icono.png" class="icono">
    <div class="users-form">
            

    </div>
    <br><br><br><br><br>
    <div class="users-table">
    <h2>Campeones añadidos</h2><br>     
        <table>
            <thead>
                <tr>    
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Procedencia</th>
                    <th>Recurso</th>
                    <th>Tipo de golpe </th>
                    <th>Imagen</th>
                    <th></th>
                    <th></th>
                </tr>

            </thead>

            <tbody>
                <?php while($row  = mysqli_fetch_array($result)):?>
                    <tr>
                        <th> <?= $row ['id']?> </th>
                        <th> <?= $row ['nombre']?> </th>
                        <th> <?= $row ['rol']?> </th>
                        <th> <?= $row ['procedencia']?> </th>
                        <th> <?= $row ['recurso']?> </th>
                        <th> <?= $row ['golpe']?> </th>
                        <td> <img src="imagenes/<?php echo $row['imagen']?>"> </td>

                        <th> <a href="update.php?id=<?=$row ['id']?> " class="users-table--edit">Editar</a></th>
                        <th><a href="delete_user.php?id=<?=$row ['id']?>" class="users-table--delete" >Eliminar</a></th>
                    </tr>
                <?php endwhile;?>   
            </tbody>
        </table>
    </div>
</body>
</html>