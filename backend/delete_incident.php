<?php

require_once __DIR__ . "/rest/services/IncidentService.class.php";

if (!isset($_REQUEST['incidentID'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => 'You have to provide a valid incident ID']));
}


$incident_id = $_REQUEST['incidentID'];

$incident_service = new IncidentService();

$incident_service->delete_incident_by_id($incident_id);

echo json_encode(['message' => "Incident deleted successfully"]);

