<?php

require_once __DIR__ . "/rest/services/CaseService.class.php";

if(!isset($_REQUEST['caseID'])){
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => 'You have to provide a valid case ID']));
}

$caseID = $_REQUEST['caseID'];

$case_service = new CaseService();

$case_service->delete_case_by_id($caseID);

echo json_encode(['message' => "Case deleted successfully"]);

