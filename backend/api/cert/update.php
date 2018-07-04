<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  // header('Content-Type: application/json');
  // header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../Database.php';
  include_once '../../models/Cert.php';
  include_once 'upload.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog cert object
  $cert = new Cert($db);

  // Get raw certed data
  $name = $id = $title = $serial = $date = '';

  $id = $_POST['id'];
  $name = $_POST['name'];
  $title = $_POST['title'];
  $serial = $_POST['serial'];
  $date = $_POST['date'];

  // Assign data
  $cert->id = $id;
  $cert->title = $title;
  $cert->serial = $serial;
  $cert->name = $name;
  $cert->date = $date;
  if($fileNameToSave != ''){
    $cert->img = $fileNameToSave;
  }else{
    $cert->img = '';
  }

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

