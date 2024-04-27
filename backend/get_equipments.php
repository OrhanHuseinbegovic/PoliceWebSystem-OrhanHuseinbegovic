<?php

require_once __DIR__ . "/rest/services/EquipmentService.class.php";


$payload = $_REQUEST;

//TODO implemenet error handling
$params = [
    'start' => (int)$payload['start'],
    'search' => $payload['search']['value'],
    'draw' => $payload['draw'],
    'limit' => (int)$payload['length'],
    'order_column' => $payload['order'][0]['name'],
    'order_direction' => $payload['order'][0]['dir'],
];


$equipment_service = new EquipmentService();
$data = $equipment_service->get_equipment_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);

foreach($data['data'] as $logID => $equipment) {
    $data['data'][$logID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                    '<button type="button" class="btn btn-warning edit" onclick="EquipmentService.open_edit_equipment_modal('.$equipment['logID'].')">Edit</button>' .
                                    '<button type="button" class="btn btn-danger" onclick="EquipmentService.delete_equipment('.$equipment['logID'].')">Delete</button>' .
                                '</div>';
}

echo json_encode([
    'draw' => $params['draw'],
    'data' => $data['data'],
    'recordsFiltered' => $data['count'],
    'recordsTotal' => $data['count'],
    'end' => $data['count']
]);

