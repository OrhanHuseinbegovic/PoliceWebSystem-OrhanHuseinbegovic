<?php

require_once __DIR__ . "/rest/services/CaseService.class.php";

$caseID = $_REQUEST['caseID'];

$case_service = new CaseService();
$case = $case_service->get_case_by_id($caseID);

header('Content-Type: application/json');
echo json_encode($case);

