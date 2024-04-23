<?php

require_once __DIR__ . "/rest/services/IncidentService.class.php";

$payload = $_REQUEST;

$params = [
    'start' => (int)$payload['start'],
    'search' => $payload['search']['value'],
    'draw' => $payload['draw'],
    'limit' => (int)$payload['length'],
    'order_column' => $payload['order'][0]['name'],
    'order_direction' => $payload['order'][0]['dir'],
];

$incident_service = new IncidentService();

$data = $incident_service->get_incidents_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);

foreach($data['data'] as $incidentID => $incident) {
    $data['data'][$incidentID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                        '<button type="button" class="btn btn-warning" onclick="IncidentService.open_edit_incident_modal('.$incident['incidentID'].')">Edit</button>' .
                                        '<button type="button" class="btn btn-danger" onclick="IncidentService.delete_incident('.$incident['incidentID'].')">Delete</button>' .
                                    '</div>';
}

echo json_encode([
    'draw' => $params['draw'],
    'data' => $data['data'],
    'recordsFiltered' => $data['count'],
    'recordsTotal' => $data['count'],
    'end' => $data['count']
]);

