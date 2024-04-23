<?php

require_once __DIR__ . "/rest/services/EquipmentService.class.php";

$logID = $_REQUEST['logID'];

$equipment_service = new EquipmentService();
$equipment = $equipment_service->get_equipment_by_id($logID);

header('Content-Type: application/json');
echo json_encode($equipment);
