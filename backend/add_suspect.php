<?php

require_once __DIR__ . "/rest/services/SuspectService.class.php";

$payload = $_REQUEST;

//TODO implemenet error handling

if($payload["name"] == NULL || $payload["name"] == ""){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'Name is missing']));
}


$suspect_service = new SuspectService();
$suspect = $suspect_service->add_suspect($payload);


echo json_encode(['message' => "Suspect added successfully", 'data' => $suspect]);