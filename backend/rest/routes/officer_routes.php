<?php

require_once __DIR__ . '/../services/OfficerService.class.php';

Flight::set('officer_service', new OfficerService());

Flight::group('/officers', function(){
    Flight::route('GET /', function(){
        //payload = $_REQUEST;
        $payload = Flight::request()->query;
    
        $params = [
            'start' => (int)$payload['start'],
            'search' => $payload['search']['value'],
            'draw' => $payload['draw'],
            'limit' => (int)$payload['length'],
            'order_column' => $payload['order'][0]['name'],
            'order_direction' => $payload['order'][0]['dir'],
        ];
    
        //$officer_service = new OfficerService();
        $data = Flight::get('officer_service')->get_officers_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);
    
        foreach($data['data'] as $officerID => $officer) {
            $data['data'][$officerID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                                '<button type="button" class="btn btn-warning edit" onclick="OfficerService.open_edit_officer_modal('.$officer['officerID'].')">Edit</button>' .
                                                '<button type="button" class="btn btn-danger" onclick="OfficerService.delete_officer('.$officer['officerID'].')">Delete</button>' .
                                            '</div>';
        }
    
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
    
    
        //OVDJE TREBAM STAVITI DA PROVJERAVA JE LI MOZDA KORISNIK IZOSTAVIO IME ILI SLICNO, PA DA BACI ERROR
        if($payload["name"] == NULL || $payload["name"] == ""){
            //header('HTTP/1.1 500 Bad Request');
            //die(json_encode(['error' => 'Name is missing']));
            Flight::halt(500, "First name field is missing");
        }
    
        //$officer_service = new OfficerService();
    
        
        if($payload['officerID'] != NULL && $payload['officerID'] != ''){
            //$officer = $officer_service->edit_officer($payload);
            $officer = Flight::get('officer_service')->edit_officer($payload);
        } else {
            unset($payload['officerID']);
            //$officer = $officer_service->add_officer($payload);
            $officer = Flight::get('officer_service')->add_officer($payload);
        }
    
        //echo json_encode(['message' => "Officer added successfully", 'data' => $officer]);
        Flight::json(['message' => "Officer added successfully", 'data' => $officer]);
    });
                         //officers/delete/15 -> $officer_id = 15
    Flight::route('DELETE /delete/@officer_id', function($officer_id){
        // Check if the 'officerID' parameter is provided in the request
        if ($officer_id == NULL || $officer_id == '') {
            //header('HTTP/1.1 400 Bad Request');
            //die(json_encode(['error' => 'You have to provide a valid officer ID']));
            Flight::halt(500, "You have to provide a valid officer ID");
        }
    
        // Delete the officer by ID
        //$officer_service->delete_officer_by_id($officer_id);
        Flight::get('officer_service')->delete_officer_by_id($officer_id);
    
        // Respond with success message
        //echo json_encode(['message' => "Officer deleted successfully"]);
        Flight::json(['message' => "Officer deleted successfully"]);
    });
    
    Flight::route('GET /@officer_id', function($officer_id){
        //$officer_id = $_REQUEST['officerID'];
        //$officer_service = new OfficerService();
        //$officer = $officer_service->get_officer_by_id($officer_id);
        $officer = Flight::get('officer_service')->get_officer_by_id($officer_id);
        
        //header('Content-Type: application/json');
        //echo json_encode($officer);
        Flight::json($officer);
    });
});