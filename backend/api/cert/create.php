<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  // header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../Database.php';
  include_once '../../models/Cert.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $cert = new Cert($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  $cert->title = $data->title;
  $cert->serial = $data->serial;
  $cert->name = $data->name;
  $cert->date = $data->date;

  // Create post
  if($cert->create()) {
    echo json_encode(
      array('message' => 'Post Created')
    );
  } else {
    echo json_encode(
      array('message' => 'Post Not Created')
    );
  }

