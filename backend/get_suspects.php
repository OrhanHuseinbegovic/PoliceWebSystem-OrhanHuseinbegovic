<?php

require_once __DIR__ . "/rest/services/SuspectService.class.php";

$payload = $_REQUEST;

$params = [
    'start' => (int)$payload['start'],
    'search' => $payload['search']['value'],
    'draw' => $payload['draw'],
    'limit' => (int)$payload['length'],
    'order_column' => $payload['order'][0]['name'],
    'order_direction' => $payload['order'][0]['dir'],
];

$suspect_service = new SuspectService();
$data = $suspect_service->get_suspects_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);


foreach($data['data'] as $suspectID => $suspect) {
    $data['data'][$suspectID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                        '<button type="button" class="btn btn-warning" onclick="SuspectService.open_edit_suspect_modal('.$suspect['suspectID'].')">Edit</button>' .
                                        '<button type="button" class="btn btn-danger" onclick="SuspectService.delete_suspect('.$suspect['suspectID'].')">Delete</button>' .
                                    '</div>';
}
//onclick="SuspectService.open_edit_suspect_modal('.$suspect['suspectID'].')"
//onclick="SuspectService.delete_suspect('.$suspect['suspectID'].')"
// UMJESTO OVOGO id mozda ide suspectID
// onclick="SuspectService.open_edit_suspect_modal('. $suspect['id'] .')"
// onclick="SuspectService.delete_suspect('. $suspect['id'] .')"


// Response
echo json_encode([
    'draw' => $params['draw'],
    'data' => $data['data'],
    'recordsFiltered' => $data['count'],
    'recordsTotal' => $data['count'],
    'end' => $data['count']
]);