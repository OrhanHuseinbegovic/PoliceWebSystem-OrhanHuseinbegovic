<?php

require_once __DIR__ . "/rest/services/CaseService.class.php";

$payload = $_REQUEST;

//TODO implemenet error handling

if($payload["name"] == NULL || $payload["name"] == ""){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'Name is missing']));
}


$case_service = new CaseService();

if($payload['caseID'] != NULL && $payload['caseID'] != ''){
    $case = $case_service->edit_case($payload);
} else {
    unset($payload['caseID']);
    $case = $case_service->add_case($payload);
}

echo json_encode(['message' => "Case added successfully", 'data' => $case]);
