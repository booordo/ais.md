<?php
$secret = "6Lek5icUAAAAABpGAghPuasn60zad4fUF3uHwfVT";
$response = $_POST["captcha"];
$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$response);
$captcha_success = json_decode($verify, true);

if ($captcha_success["success"] == false) {
	echo "ERROR";
} elseif ($captcha_success["success"] == true) {
	$name = test_input($_POST["name"]);
	$phone = test_input($_POST["phone"]);

	if (empty($name) && empty($phone)) {
		die();	
	}

	$to = "booordo@mail.ru";
	$subject = "Новое сообщение на сайте AIS.MD";
	$message = "Имя: " . $name . "; Телефон: " . $phone . ";";

	mail($to, $subject, $message);

	echo "OK";
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>