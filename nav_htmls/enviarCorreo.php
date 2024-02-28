<?php
// Asegúrate de capturar los datos del formulario como antes
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["nombre"]));
    $telefono = strip_tags(trim($_POST["tlf"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = trim($_POST["mensaje"]);

    // Dirección de correo del remitente
    $de = 'richi3fvg@gmail.com';

    // El asunto del correo
    $asunto = "Confirmación de tu mensaje";

    // Construye el cuerpo del mensaje en HTML
    $cuerpoMensaje = "<p>Hola $nombre,</p>";
    $cuerpoMensaje .= "<p>He recibido tu mensaje con los siguientes detalles:</p>";
    $cuerpoMensaje .= "<p>Teléfono: $telefono</p>";
    $cuerpoMensaje .= "<p>Mensaje:<br>$mensaje</p>";
    $cuerpoMensaje .= "<p>Trataré de estar en contacto contigo pronto.</p>";

    // Claves API de Mailjet
    $apiKeyPublic = 'b202e7778b9637602c4d8fb04b91c499';
    $apiKeyPrivate = '80c87ad5670a6b953db04a462f117eef';

    // Datos para la petición a Mailjet
    $data = [
        'Messages' => [
            [
                'From' => [
                    'Email' => $de,
                    'Name' => "Richard Francisco"
                ],
                'To' => [
                    [
                        'Email' => $email,
                        'Name' => $nombre
                    ]
                ],
                'Subject' => $asunto,
                'HTMLPart' => $cuerpoMensaje,
            ]
        ]
    ];

    $ch = curl_init('https://api.mailjet.com/v3.1/send');
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$apiKeyPublic:$apiKeyPrivate");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) {
        echo "Lo siento, ha habido un error al enviar tu mensaje: $err";
    } else {
        echo "Mensaje enviado con éxito a $email.";
    }
} else {
    // No es un POST, redirige a la página del formulario
    header("Location: ./contact_me.html");
    exit;
}
?>
