<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../Database.php';
  include_once '../../models/Cert.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog Cert object
  $Cert = new Cert($db);

  // Get ID
  $Cert->serial = isset($_GET['serial']) ? $_GET['serial'] : die();

  // Get Cert
  $Cert->read_single();

  // Create array
  $Cert_arr = array(
    'id' => $Cert->id,
    'title' => $Cert->title,
    'name' => $Cert->name,
    'date' => $Cert->date,
    'serial' => $Cert->serial,
    'img'=> $Cert->img
  );

  // Make JSON
  print_r(json_encode($Cert_arr));