<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../Database.php';
  include_once '../../models/Cert.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog cert object
  $cert = new Cert($db);

  // Blog cert query
  $result = $cert->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any certs
  if($num > 0) {
    // cert array
    $certs_arr = array();
    $certs_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $cert_item = array(
        'id' => $id,
        'title' => $title,
        'serial' => $serial,
        'name' => html_entity_decode($name),
        'date' => $date,
        'img' => $img
      );

      // Push to "data"
      array_push($certs_arr['data'], $cert_item);
    }

    // Turn to JSON & output
    echo json_encode($certs_arr);

  } else {
    // No certs
    echo json_encode(
      array('message' => 'No certs Found')
    );
  }