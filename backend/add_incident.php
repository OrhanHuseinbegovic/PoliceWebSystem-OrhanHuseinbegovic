<?php

require_once __DIR__ . "/rest/services/IncidentService.class.php";

$payload = $_REQUEST;

//TODO implemenet error handling

if($payload["description"] == NULL || $payload["description"] == ""){
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => 'Description is missing']));
}

$incident_service = new IncidentService();

if($payload['incidentID'] != NULL && $payload['incidentID'] != ''){
    $incident = $incident_service->edit_incident($payload);
} else {
    unset($payload['incidentID']);
    $incident = $incident_service->add_incident($payload);
}

echo json_encode(['message' => "Incident added successfully", 'data' => $incident]);

