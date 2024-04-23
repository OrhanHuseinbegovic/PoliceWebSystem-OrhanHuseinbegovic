<?php

require_once __DIR__ . "/rest/services/OfficerService.class.php";

$payload = $_REQUEST;

//TODO implemenet error handling

if($payload["name"] == NULL || $payload["name"] == ""){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'Name is missing']));
}

$officer_service = new OfficerService();

if($payload['officerID'] != NULL && $payload['officerID'] != ''){
    $officer = $officer_service->edit_officer($payload);
} else {
    unset($payload['officerID']);
    $officer = $officer_service->add_officer($payload);
}

echo json_encode(['message' => "Officer added successfully", 'data' => $officer]);