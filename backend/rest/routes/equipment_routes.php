<?php

require_once __DIR__ . "/../services/EquipmentService.class.php";

Flight::set('equipment_service', new EquipmentService());

Flight::group('/equipments', function(){

    /**
     * @OA\Get(
     *      path="/equipments/all",
     *      tags={"Equipment"},
     *      summary="Get all equipment",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all equipment in the databases"
     *      )
     * )
     */

     Flight::route('GET /all', function(){
        $data = Flight::get('equipment_service')->get_all_equipment();
        Flight::json($data,200);
    });

     /**
     * @OA\Get(
     *      path="/equipments/equipment",
     *      tags={"Equipment"},
     *      summary="Get equipment by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Information of the equipment by ID"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="equipmentID", example="1", description="Equipment ID")
     * )
     */

     Flight::route('GET /equipment', function(){
        $params = Flight::request()->query;

        $equipment = Flight::get('equipment_service')->get_equipment_by_id($params['equipmentID']);

        Flight::json($equipment);
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

        $data = Flight::get('equipment_service')->get_equipment_paginated($params['start'], $params['limit'], $params['search'], $params['order_column'], $params['order_direction']);

        foreach($data['data'] as $logID => $equipment) {
            $data['data'][$logID]['action'] = '<div class="btn-group" role="group" aria-label="Actions">' .
                                            '<button type="button" class="btn btn-warning edit" onclick="EquipmentService.open_edit_equipment_modal('.$equipment['logID'].')">Edit</button>' .
                                            '<button type="button" class="btn btn-danger" onclick="EquipmentService.delete_equipment('.$equipment['logID'].')">Delete</button>' .
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
     *      path="/equipments/add",
     *      tags={"Equipment"},
     *      summary="Add equipment to the database",
     *      @OA\Response(
     *           response=200,
     *           description="Equipment data, or exception if equipment is not added properly"
     *      ),
     *      @OA\RequestBody(
     *           description="Case data",
     *           @OA\JsonContent(
     *             required={"officerID", "weapon", "vehicle", "shift", "date"},
     *             @OA\Property(property="logID", type="number", example="", description="Log ID (leave empty if adding new equipment log)"),
     *             @OA\Property(property="officerID", type="number", example="1", description="Officer ID"),
     *             @OA\Property(property="weapon", type="string", example="Pistol", description="Weapon"),
     *             @OA\Property(property="vehicle", type="string", example="Golf 7", description="Vehicle"),
     *             @OA\Property(property="shift", type="string", example="night", description="Shift"),
     *             @OA\Property(property="date", type="string", example="2000-01-01", description="Equipment log date made"),
     *          )
     *      )
     * )
     */

    Flight::route('POST /add', function(){
        $payload = Flight::request()->data->getData();

        if($payload["weapon"] == NULL || $payload["weapon"] == ""){
            //header('HTTP/1.1 500 Bad Request');
            //die(json_encode(['error' => 'Weapon is missing']));
            Flight::halt(500, "Weapon selection not finished");
        }

        if($payload["vehicle"] == NULL || $payload["vehicle"] == ""){
            //header('HTTP/1.1 500 Bad Request');
            //die(json_encode(['error' => 'Vehicle is missing']));
        }

        if($payload['logID'] != NULL && $payload['logID'] != ''){
            $equipment = Flight::get('equipment_service')->edit_equipment($payload);
        } else {
            unset($payload['logID']);
            $equipment = Flight::get('equipment_service')->add_equipment($payload);
        }

        Flight::json(['message' => "Equipment added successfully", 'data' => $equipment]); //ovaj Flight::get('equipment_service') treba zamijeniti  sa $equipment_service
    });

    /**
     * @OA\Delete(
     *      path="/equipments/delete/{logID}",
     *      tags={"Equipment"},
     *      summary="Delete equipment by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Deleteded equipment by ID data or 500 status code exception"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="logID", example="1", description="Equipment ID")
     * )
     */

    Flight::route('DELETE /delete/@log_id', function($log_id){
        // Check if the 'logID' parameter is provided in the request
        if ($log_id == NULL || $log_id=='') {
            Flight::halt(500, 'You have to provide a valid log ID');
        }
        
        Flight::get('equipment_service')->delete_equipment_by_id($log_id);

        // Respond with success message
        Flight::json(['message' => "Equipment deleted successfully"]);
    });

    Flight::route('GET /@log_id', function($log_id){
        $equipment = Flight::get('equipment_service')->get_equipment_by_id($log_id);
        
        Flight::json($equipment);
    });
});