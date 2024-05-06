<?php

require_once __DIR__ . '/../services/OfficerService.class.php';

Flight::set('officer_service', new OfficerService());

Flight::group('/officers', function(){

    /**
     * @OA\Get(
     *      path="/officers/all",
     *      tags={"Officers"},
     *      summary="Get all officers",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all officers in the databases"
     *      )
     * )
     */
    Flight::route('GET /all', function() {
        $data = Flight::get('officer_service')->get_all_officers();
        Flight::json($data, 200);
    });

     /**
     * @OA\Get(
     *      path="/officers/officer",
     *      tags={"Officers"},
     *      summary="Get officer by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Information of the officer by ID"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="officerID", example="1", description="Officer ID")
     * )
     */

    Flight::route('GET /officer', function(){
        $params = Flight::request()->query;

        $officer = Flight::get('officer_service')->get_officer_by_id($params['officerID']);

        Flight::json($officer);
    });

    /**
     * @OA\Delete(
     *      path="/officers/delete/{officerID}",
     *      tags={"Officers"},
     *      summary="Delete officer by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Deleteded officer by ID data or 500 status code exception"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="officerID", example="1", description="Officer ID")
     * )
     */

     Flight::route('DELETE /delete/@officerID', function($officer_id){
        if($officer_id == NULL || $officer_id == ''){
            Flight::halt(500, "You have to provide a valid officer ID");
        } else {
            // Proceed with deleting the officer
            Flight::get('officer_service')->delete_officer_by_id($officer_id);
            Flight::json(['message' => "Officer deleted successfully"]);
        }
    });

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
    
    /**
     * @OA\Post(
     *      path="/officers/add",
     *      tags={"Officers"},
     *      summary="Add officer to the database",
     *      @OA\Response(
     *           response=200,
     *           description="Officer data, or exception if officer is not added properly"
     *      ),
     *      @OA\RequestBody(
     *           description="Officer data",
     *           @OA\JsonContent(
     *             required={"personalID", "name", "surname", "dateOfBirth", "email", "phone", "department"},
     *             @OA\Property(property="officerID", type="number", example="1", description="Officer ID (leave empty if adding new officer)"),
     *             @OA\Property(property="personalID", type="number", example="1", description="Personal ID"),
     *             @OA\Property(property="name", type="string", example="John Doe", description="Officer name"),
     *             @OA\Property(property="surname", type="string", example="Doe", description="Officer surname"),  
     *             @OA\Property(property="dateOfBirth", type="string", example="1990-01-01", description="Officer date of birth"),
     *             @OA\Property(property="email", type="string", example="johndoe@police.com", description="Officer email"),
     *             @OA\Property(property="phone", type="number", example="061123456", description="Officer phone number"),
     *             @OA\Property(property="department", type="string", example="Violent crime", description="Officer department")
     *          )
     *      )
     * )
     */



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