<?php

require_once __DIR__ . "/services/OfficerService.class.php";

$payload = $_REQUEST;

if($payload['name']==null){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'First name field is missing']));
}

$OfficerService = new OfficerService();
$OfficerService->addOfficer([]);