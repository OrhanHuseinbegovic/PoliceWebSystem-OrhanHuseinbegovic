<?php

require_once __DIR__ . "/rest/services/OfficerService.class.php";

$officer_id = $_REQUEST['officerID'];

$officer_service = new OfficerService();
$officer = $officer_service->get_officer_by_id($officer_id);


header('Content-Type: application/json');
echo json_encode($officer);

