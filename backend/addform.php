<?php 

    include_once 'Database.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    header("Access-Control-Allow-Origin: *");
    $return_arr[] = array("serial" => $_POST["serial"],
        "name" => $_POST["name"],
        "title" => $_POST["title"],
        "date" => $_POST["date"]);

        echo json_encode($return_arr);
    
?>