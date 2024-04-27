<?php

require_once __DIR__ . "/rest/services/EquipmentService.class.php";

$payload = $_REQUEST;

//TODO implemenet error handling

if($payload["weapon"] == NULL || $payload["weapon"] == ""){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'Weapon is missing']));
}

if($payload["vehicle"] == NULL || $payload["vehicle"] == ""){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'Vehicle is missing']));
}


echo json_encode(['message' => "Equipment added successfully", 'data' => $equipment_service->add_equipment($payload)]);
