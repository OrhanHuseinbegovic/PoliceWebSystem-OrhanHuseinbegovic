<?php

require_once __DIR__ .'/../services/SuspectService.class.php';

Flight::set('suspect_service', new SuspectService());

Flight::group('/suspects', function(){
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

        //$suspect_service = new SuspectService();
        $data = Flight::get('suspect_service')->get_suspects_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);


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
        /*
        echo json_encode([
            'draw' => $params['draw'],
            'data' => $data['data'],
            'recordsFiltered' => $data['count'],
            'recordsTotal' => $data['count'],
            'end' => $data['count']
        ]);
        */

        Flight::json([
            'draw' => $params['draw'],
            'data' => $data['data'],
            'recordsFiltered' => $data['count'],
            'recordsTotal' => $data['count'],
            'end' => $data['count']
        ]);
    });

    Flight::route('POST /add', function(){
        //$payload = $_REQUEST;
        $payload = Flight::request()->data->getData();

        if($payload["name"] == NULL || $payload["name"] == ""){
            //header('HTTP/1.1 500 Bad Request');
            //die(json_encode(['error' => 'Name is missing']));
            Flight::halt(500, "First name field is missing");
        }


        //$suspect_service = new SuspectService();


        if($payload['suspectID'] != NULL && $payload['suspectID'] != ''){
            //$suspect = $suspect_service->edit_suspect($payload);
            $suspect = Flight::get('suspect_service')->edit_suspect($payload);
        } else {
            unset($payload['suspectID']);
            //$suspect = $suspect_service->add_suspect($payload);
            $suspect = Flight::get('suspect_service')->add_suspect($payload);
        }

        //echo json_encode(['message' => "Suspect added successfully", 'data' => $suspect]);
        Flight::json(['message' => "Suspect added successfully", 'data' => $suspect]);
    });

    Flight::route('DELETE /delete/@suspect_id', function($suspect_id){
        // Check if the 'suspectID' parameter is provided in the request
        if ($suspect_id == NULL || $suspect_id == '') {
            //header('HTTP/1.1 400 Bad Request');
            //die(json_encode(['error' => 'You have to provide a valid suspect ID']));
            Flight::halt(500, "You have to provide a valid suspect ID");
        }
        // Delete the suspect by ID
        Flight::get('suspect_service')->delete_suspect_by_id($suspect_id);

        // Respond with success message
        //echo json_encode(['message' => "Suspect deleted successfully"]);
        Flight::json(['message' => "Suspect deleted successfully"]);
    });

    Flight::route('GET /@suspect_id', function($suspect_id){
        //$suspect_id = $_REQUEST['suspectID'];

       // $suspect_service = new SuspectService();
        //$suspect = $suspect_service->get_suspect_by_id($suspect_id);

        $suspect = Flight::get('suspect_service')->get_suspect_by_id($suspect_id);

        //header('Content-Type: application/json');
        //echo json_encode($suspect);
        Flight::json($suspect);
    });
});