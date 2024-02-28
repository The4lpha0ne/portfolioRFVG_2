<?php
    // 1. Verifica si el método de la solicitud es 
    // POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // 2. Limpia y asigna los datos recibidos del 
        // formulario a variables
        $nombre = strip_tags(trim($_POST["nombre"]));
        // 3. Limpia y asigna el teléfono
        $telefono = strip_tags(trim($_POST["tlf"]));
        // 4. Limpia y valida el email
        $email = 
        filter_var(
            trim($_POST["email"]), 
            FILTER_SANITIZE_EMAIL
        );
        // 5. Asigna el mensaje
        $mensaje = trim($_POST["mensaje"]);

        // 6. Define la dirección de correo electrónico 
        // del remitente
        $de = 'richi3fvg@gmail.com';

        // 7. Define el asunto del correo electrónico
        $asunto = "Confirmación de tu mensaje";

        // 8. Se construye el cuerpo del mensaje en 
        // formato HTML
        $cuerpoMensaje = "<p>Hola $nombre,</p>";
        $cuerpoMensaje .= 
        "<p>He recibido tu mensaje con los siguientes detalles:</p>";
        $cuerpoMensaje .= "<p>Teléfono: $telefono</p>";
        $cuerpoMensaje .= "<p>Mensaje:<br>$mensaje</p>";
        $cuerpoMensaje .= 
        "<p>Trataré de estar en contacto contigo pronto.</p>";

        // 9. Se almacena claves API de Mailjet 
        // (IMPORTANTE, NO COMPARTIR)
        $apiKeyPublic = 'b202e7778b9637602c4d8fb04b91c499';
        $apiKeyPrivate = '80c87ad5670a6b953db04a462f117eef';

        // 10. Prepara los datos para la petición API 
        // de Mailjet
        $data = [
            'Messages' => [
                [
                    'From' => [
                        // Define el remitente
                        'Email' => $de,
                        // Nombre del remitente
                        'Name' => "Richard FVG"
                    ],
                    'To' => [
                        [
                            // Define el destinatario
                            'Email' => $email,
                            // Nombre del destinatario
                            'Name' => $nombre
                        ]
                    ],
                    // Asunto del correo
                    'Subject' => $asunto,
                    // Cuerpo del mensaje en HTML
                    'HTMLPart' => $cuerpoMensaje,
                ]
            ]
        ];

        // 11. Inicializa cURL para la petición a la API 
        // de Mailjet
        $ch = curl_init('https://api.mailjet.com/v3.1/send');
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt(
            $ch, CURLOPT_USERPWD, "$apiKeyPublic:$apiKeyPrivate"
        );
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);

        // 12. Ejecuta la petición y recoge la respuesta
        $response = curl_exec($ch);
        // 13. Recoge cualquier error
        $err = curl_error($ch);
        // 14. Cierra la sesión cURL
        curl_close($ch);

        // 15. Verifica si hubo errores y muestra un 
        // mensaje correspondiente
        if ($err) {
            echo "Lo siento, ha habido un error al enviar tu mensaje: $err";
        } 
        
        else {
            echo "Mensaje enviado con éxito a $email.";
        }
    } 

    else {
        // 16. Si no es un método POST, redirige al usuario 
        // a la página de contacto
        header("Location: ./contact_me.html");
        // 17. Finaliza la ejecución para evitar cargas 
        // adicionales del script
        exit;
    }
?>
