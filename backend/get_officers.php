<?php

require_once __DIR__ . "/rest/services/OfficerService.class.php";

$payload = $_REQUEST;

$params = [
    'start' => (int)$payload['start'],
    'search' => $payload['search']['value'],
    'draw' => $payload['draw'],
    'limit' => (int)$payload['length'],
    'order_column' => $payload['order'][0]['name'],
    'order_direction' => $payload['order'][0]['dir'],
];

$officer_service = new OfficerService();
$data = $officer_service->get_officers_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);

foreach($data['data'] as $officerID => $officer) {
    $data['data'][$officerID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                        '<button type="button" class="btn btn-warning edit" onclick="OfficerService.open_edit_officer_modal('.$officer['officerID'].')">Edit</button>' .
                                        '<button type="button" class="btn btn-danger" onclick="OfficerService.delete_officer('.$officer['officerID'].')">Delete</button>' .
                                    '</div>';
}

echo json_encode([
    'draw' => $params['draw'],
    'data' => $data['data'],
    'recordsFiltered' => $data['count'],
    'recordsTotal' => $data['count'],
    'end' => $data['count']
]);