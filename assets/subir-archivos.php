<?php

if (isset($_FILES["file"])) {
  $name = $_FILES["file"]["name"];
  $file = $_FILES["file"]["tmp_name"];
  $error = $_FILES["file"]["error"];
  $destination = "../files/$name";

  $upload = move_uploaded_file($file, $destination);

  if ($upload) {
    $res = array(
      "err" => false,
      "status" => http_response_code(200),
      "statusText" => "Archivo $file subido con éxito",
      "files" => $_FILES["file"]
    );
  } else {
    $res = array(
      "err" => true,
      "status" => http_response_code(400),
      "statusText" => "Error al subir el archivo $file",
      "files" => $_FILES["file"]
    );
  }

  //El echo es lo que se muestra en la petición desde AJAX
  echo json_encode($res);
}
?>