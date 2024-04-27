<?php

require_once __DIR__ . "/rest/services/SuspectService.class.php";

// Check if the 'suspectID' parameter is provided in the request
if (!isset($_REQUEST['suspectID'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => 'You have to provide a valid suspect ID']));
}

// Get the suspect ID from the request
$suspect_id = $_REQUEST['suspectID'];

// Create an instance of SuspectService class
$suspect_service = new SuspectService();

// Delete the suspect by ID
$suspect_service->delete_suspect_by_id($suspect_id);

// Respond with success message
echo json_encode(['message' => "Suspect deleted successfully"]);