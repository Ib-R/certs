<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  // header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../Database.php';
  include_once '../../models/Cert.php';
  include_once 'upload.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $cert = new Cert($db);

  // Get raw posted data
  $name = $title = $serial = $date = '';

  $name = $_POST['name'];
  $title = $_POST['title'];
  $serial = $_POST['serial'];
  $date = $_POST['date'];

  $cert->title = $title;
  $cert->serial = $serial;
  $cert->name = $name;
  $cert->date = $date;
  $cert->img = $fileNameToSave;

  // Create post
  if($cert->create()) {
    echo json_encode(
      array('message' => 'Post Created and '.$msg)
    );
  } else {
    echo json_encode(
      array('message' => 'Post Not Created')
    );
  }

