<?php

require_once __DIR__ . "/rest/services/EquipmentService.class.php";


// Check if the 'logID' parameter is provided in the request
if (!isset($_REQUEST['logID'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => 'You have to provide a valid log ID']));
}

// Get the log ID from the request

$logID = $_REQUEST['logID'];

// Create an instance of EquipmentService class
$equipment_service = new EquipmentService();

// Delete the equipment by ID
$equipment_service->delete_equipment_by_id($logID);

// Respond with success message
echo json_encode(['message' => "Equipment deleted successfully"]);
