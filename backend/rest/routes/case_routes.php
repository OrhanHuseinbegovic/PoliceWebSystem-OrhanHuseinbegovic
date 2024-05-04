<?php

require_once __DIR__ . '/../services/CaseService.class.php';

Flight::set('case_service', new CaseService());

Flight::group('/cases', function(){
    Flight::route('GET /', function(){
        //$payload = $_REQUEST;
        $payload = Flight::request()->query;

        $params = [
            'start' => (int)$payload['start'],
            'search' => $payload['search']['value'],
            'draw' => $payload['draw'],
            'limit' => (int)$payload['length'],
            'order_column' => $payload['order'][0]['name'],
            'order_direction' => $payload['order'][0]['dir'],
        ];
        
        //$case_service = new CaseService();
        $data = Flight::get('case_service')->get_cases_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);
        
        foreach($data['data'] as $caseID => $case) {
            $data['data'][$caseID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                                '<button type="button" class="btn btn-warning edit" onclick="CaseService.open_edit_case_modal('.$case['caseID'].')">Edit</button>' .
                                                '<button type="button" class="btn btn-danger" onclick="CaseService.delete_case('.$case['caseID'].')">Delete</button>' .
                                            '</div>';
        }
        
        Flight::json([
            'draw' => $params['draw'],
            'data' => $data['data'],
            'recordsFiltered' => $data['count'],
            'recordsTotal' => $data['count'],
            'end' => $data['count']
        ]);        
    });

    Flight::route('POST /add', function(){
        $payload = Flight::request()->data->getData();

        if($payload["name"] == NULL || $payload["name"] == ""){
            //header('HTTP/1.1 500 Bad Request');
            //die(json_encode(['error' => 'Name is missing']));
            Flight::halt(500, "Fist name field is missing");
        }


        //$case_service = new CaseService();

        if($payload['caseID'] != NULL && $payload['caseID'] != ''){
            $case = Flight::get('case_service')->edit_case($payload);
        } else {
            unset($payload['caseID']);
            $case = Flight::get('case_service')->add_case($payload);
        }

        Flight::json(['message' => "Case added successfully", 'data' => $case]);
    });

    Flight::route('DELETE /delete/@case_id', function($case_id){
        if($case_id == NULL || $case_id==''){
            //header('HTTP/1.1 400 Bad Request');
            //die(json_encode(['error' => 'You have to provide a valid case ID']));
            Flight::halt(500, "You have to provide a valid case ID");
        }
        
        Flight::get('case_service')->delete_case_by_id($case_id);
        
        Flight::json(['message' => "Case deleted successfully"]);
    });

    Flight::route('GET /@case_id', function($case_id){
        $case = Flight::get('case_service')->get_case_by_id($case_id);

        Flight::json($case);
    });
});