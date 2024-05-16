<?php

require_once __DIR__ . '/../services/IncidentService.class.php';

Flight::set('incident_service', new IncidentService());

Flight::group('/incidents', function(){

    /**
     * @OA\Get(
     *      path="/incidents/all",
     *      tags={"Incidents"},
     *      summary="Get all incidents",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all incidents in the databases"
     *      )
     * )
     */

    Flight::route('GET /all', function(){
        $data = Flight::get('incident_service')->get_all_incidents();
        Flight::json($data,200);
    });

    /**
     * @OA\Get(
     *      path="/incidents/incident",
     *      tags={"Incidents"},
     *      summary="Get incident by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Information of the incident by ID"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="incidentID", example="1", description="Incident ID")
     * )
     */
    
    Flight::route('GET /incident', function(){
        $params = Flight::request()->query;

        $incident = Flight::get('incident_service')->get_incident_by_id($params['incidentID']);

        Flight::json($incident);
    });


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

    /**
     * @OA\Post(
     *      path="/incidents/add",
     *      tags={"Incidents"},
     *      summary="Add incident to the database",
     *      @OA\Response(
     *           response=200,
     *           description="Incident data, or exception if incident is not added properly"
     *      ),
     *      @OA\RequestBody(
     *           description="Officer data",
     *           @OA\JsonContent(
     *             required={"incidentID", "officerID", "type", "location", "date", "description"},
     *             @OA\Property(property="incidentID", type="number", example="", description="Incident ID (leave empty if adding new officer)"),
     *             @OA\Property(property="officerID", type="number", example="1", description="Officer ID"),
     *             @OA\Property(property="type", type="string", example="Theft", description="Type"),
     *             @OA\Property(property="location", type="string", example="Sarajevo", description="Location"),  
     *             @OA\Property(property="date", type="string", example="1990-01-01", description="Date"),
     *             @OA\Property(property="description", type="string", example="Something happened in here.", description="Description")
     *          )
     *      )
     * )
     */

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

    /**
     * @OA\Delete(
     *      path="/incidents/delete/{incidentID}",
     *      tags={"Incidents"},
     *      summary="Delete incidents by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Deleteded incident by ID data or 500 status code exception"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="incidentID", example="1", description="Incident ID")
     * )
     */

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