<?php

require_once __DIR__ . "/rest/services/OfficerService.class.php";


// Check if the 'officerID' parameter is provided in the request
if (!isset($_REQUEST['officerID'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => 'You have to provide a valid officer ID']));
}

// Get the officer ID from the request
$officer_id = $_REQUEST['officerID'];

// Create an instance of OfficerService class
$officer_service = new OfficerService();

// Delete the officer by ID
$officer_service->delete_officer_by_id($officer_id);

// Respond with success message
echo json_encode(['message' => "Officer deleted successfully"]);