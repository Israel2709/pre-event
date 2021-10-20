<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
 <meta http-equiv="refresh" content="5 ;URL=/index.html" />

<title>Untitled 1</title>

<style type="text/css">
#redireccionamiento {
	font-family: Arial;
	font-size: x-large;
	font-weight: bold;
	font-style: italic;
	background-image: url('img/centrado/bgtable.png');
	width: 600px;
	margin-right: auto;
	margin-left: auto;
	text-align: center;
	margin-top: 100px;
</style>

</head>

<body>
<?php
$aviso = "";
if ($_POST['email'] != "") {
    // email de destino
    $email = "israel.salinas.m@gmail.com";
   
    // asunto del email
    $subject = "Contacto";
   
    // Cuerpo del mensaje ( aquí hay que mapear el form )
    $mensaje = "---------------------------------- \n";
    $mensaje.= "            Contacto               \n";
    $mensaje.= "---------------------------------- \n";
    $mensaje.= "NOMBRE:   ".$_POST['name']."\n";
    $mensaje.= "APELLIDOS:   ".$_POST['lastname']."\n";
    $mensaje.= "EMAIL:    ".$_POST['email']."\n";
    $mensaje.= "TELEFONO: ".$_POST['telefono']."\n";
    $mensaje.= "FECHA:    ".date("d/m/Y")."\n";
    $mensaje.= "HORA:     ".date("h:i:s a")."\n";
    $mensaje.= "IP:       ".$_SERVER['REMOTE_ADDR']."\n\n";
    $mensaje.= "---------------------------------- \n\n";
    $mensaje.= $_POST['message']."\n\n";
    $mensaje.= "---------------------------------- \n";
    $mensaje.= "Enviado desde https://idclatamevents.online/events/CIOSUMMIT/Registro/ \n";
   
    // headers del email
    $headers = "From: ".$_POST['email']."\r\n";
   
    // Enviamos el mensaje
    if (mail($email, $subject, $mensaje, $headers)) {
        $aviso = "Su mensaje fue enviado.";
    } else {
        $aviso = "Error de envío.";
    }
}
 ?> 
 
 <div id="redireccionamiento">
 Su mensaje se envió con éxito, muchas gracias!.
 </div>



</body>

</html>
