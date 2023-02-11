<?php

require_once('sendEmail.php');

$resp = [];

$name = null;
$email = null;
$message = null;
$captcha = null;

$validName = false;
$validEmail = false;
$validMessage = false;
$validCaptcha = false;

function validName(string $name) : bool {
    // Valido con expresiones regulares
    $pattern = "/^[ a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/";
    return preg_match($pattern, $name);
}

function validEmail(string $email) : bool {
    // Valido con expresiones regulares
    $pattern = "/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/";
    return preg_match($pattern, $email);
}

// Valido nombre
if ( isset($_POST['txtName']) && $_POST['txtName'] != '') {
    $name = $_POST['txtName'];
    if (validName($name)) $validName = true;
}

// Valido email
if ( isset($_POST['txtEmail']) && $_POST['txtEmail'] != '') {
    $email = $_POST['txtEmail'];
    if (validEmail($email)) $validEmail = true;
}

// Valido message
if ( isset($_POST['txtMessage']) && $_POST['txtMessage'] != '') {
    $message = $_POST['txtMessage'];
    $validMessage = true;
}

// Valido captcha
if ( isset($_POST['txtCaptcha']) && isset($_POST['captcha'])) {
    $captcha = $_POST['captcha'];
    $captchaInput = $_POST['txtCaptcha'];
    if ($captcha === $captchaInput)
        $validCaptcha = true;
}

// Valido que los cuatro campos sean correctos para enviar el mensaje
if ($validName && $validEmail && $validMessage && $validCaptcha) {
    $result = sendEmail($name, $email, $message);
}
else {
    $result = false;
}

$resp['result'] = $result;
$resp['valid_name'] = $validName;
$resp['valid_email'] = $validEmail;
$resp['valid_message'] = $validMessage;
$resp['valid_captcha'] = $validCaptcha;

echo json_encode($resp);
