<?php

require_once __DIR__ . "/rest/services/SuspectService.class.php";

$suspect_id = $_REQUEST['suspectID'];

$suspect_service = new SuspectService();
$suspect = $suspect_service->get_suspect_by_id($suspect_id);


header('Content-Type: application/json');
echo json_encode($suspect);