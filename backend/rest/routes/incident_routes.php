<?php

require_once __DIR__ . '/../services/IncidentService.class.php';

Flight::set('incident_service', new IncidentService());

Flight::group('/incidents', function(){
    Flight::route('GET /', function(){
        $payload = Flight::request()->query;

        $params = [
            'start' => (int)$payload['start'],
            'search' => $payload['search']['value'],
            'draw' => $payload['draw'],
            'limit' => (int)$payload['length'],
            'order_column' => $payload['order'][0]['name'],
            'order_direction' => $payload['order'][0]['dir'],
        ];
        
        
        $data = Flight::get('incident_service')->get_incidents_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);
        
        foreach($data['data'] as $incidentID => $incident) {
            $data['data'][$incidentID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                                '<button type="button" class="btn btn-warning" onclick="IncidentService.open_edit_incident_modal('.$incident['incidentID'].')">Edit</button>' .
                                                '<button type="button" class="btn btn-danger" onclick="IncidentService.delete_incident('.$incident['incidentID'].')">Delete</button>' .
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

        if($payload["description"] == NULL || $payload["description"] == ""){
            //header('HTTP/1.1 500 Bad Request');
            //die(json_encode(['error' => 'Description is missing']));
            Flight::halt(500, "Description is missing");
        }
        
        //$incident_service = new IncidentService();
        
        if($payload['incidentID'] != NULL && $payload['incidentID'] != ''){
            $incident = Flight::get('incident_service')->edit_incident($payload);
        } else {
            unset($payload['incidentID']);
            $incident = Flight::get('incident_service')->add_incident($payload);
        }
        
        Flight::json(['message' => "Incident added successfully", 'data' => $incident]);
        
    });

    Flight::route('DELETE /delete/@incident_id', function($incident_id){
        if ($incident_id == NULL || $incident_id=='') {
            //header('HTTP/1.1 400 Bad Request');
            //die(json_encode(['error' => 'You have to provide a valid incident ID']));
            Flight::halt(500, "You have to provide valid incident ID");
        }
        
        Flight::get('incident_service')->delete_incident_by_id($incident_id);
        
        Flight::json(['message' => "Incident deleted successfully"]);        
    });

    Flight::route('GET /@incident_id', function($incident_id){
        $incident = Flight::get('incident_service')->get_incident_by_id($incident_id);
        
        Flight::json($incident);
    });
});