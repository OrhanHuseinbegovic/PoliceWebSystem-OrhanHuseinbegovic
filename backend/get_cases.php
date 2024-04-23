<?php

require_once __DIR__ . "/rest/services/CaseService.class.php";

$payload = $_REQUEST;

$params = [
    'start' => (int)$payload['start'],
    'search' => $payload['search']['value'],
    'draw' => $payload['draw'],
    'limit' => (int)$payload['length'],
    'order_column' => $payload['order'][0]['name'],
    'order_direction' => $payload['order'][0]['dir'],
];

$case_service = new CaseService();
$data = $case_service->get_cases_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);

foreach($data['data'] as $caseID => $case) {
    $data['data'][$caseID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                        '<button type="button" class="btn btn-warning edit" onclick="CaseService.open_edit_case_modal('.$case['caseID'].')">Edit</button>' .
                                        '<button type="button" class="btn btn-danger" onclick="CaseService.delete_case('.$case['caseID'].')">Delete</button>' .
                                    '</div>';
}

echo json_encode([
    'draw' => $params['draw'],
    'data' => $data['data'],
    'recordsFiltered' => $data['count'],
    'recordsTotal' => $data['count'],
    'end' => $data['count']
]);


