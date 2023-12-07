<?php 
// 1. Define la función para establecer una conexión con la base de datos
function connection(){
    // 2. Establece los parámetros de conexión a la base de datos
    $host = "localhost";
    $user = "root";
    $pass = "";
    
    // 3. Define el nombre de la base de datos
    $db = "proyecto_crud_1";

    // 4. Conecta con el servidor de base de datos
    $connect = mysqli_connect($host, $user, $pass);	
    
    // 5. Selecciona la base de datos con la que se trabajará
    mysqli_select_db($connect, $db);
    
    // 6. Devuelve el objeto de conexión
    return $connect;
}
?>
