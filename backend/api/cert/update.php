<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../Database.php';
  include_once '../../models/Cert.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog cert object
  $cert = new Cert($db);

  // Get raw certed data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $cert->id = $data->id;
  $cert->title = $data->title;
  $cert->name = $data->name;
  $cert->date = $data->date;
  $cert->serial = $data->serial;

  // Update cert
  if($cert->update()) {
    echo json_encode(
      array('message' => 'cert Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'cert Not Updated')
    );
  }

