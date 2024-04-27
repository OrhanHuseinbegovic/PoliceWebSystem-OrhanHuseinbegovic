<?php

require_once __DIR__ . "/rest/services/IncidentService.class.php";

$incident_id = $_REQUEST['incidentID'];

$incident_service = new IncidentService();
$incident = $incident_service->get_incident_by_id($incident_id);

header('Content-Type: application/json');
echo json_encode($incident);

