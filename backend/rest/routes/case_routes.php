<?php

require_once __DIR__ . '/../services/CaseService.class.php';

Flight::set('case_service', new CaseService());

Flight::group('/cases', function(){

    /**
     * @OA\Get(
     *      path="/cases/all",
     *      tags={"Cases"},
     *      summary="Get all cases",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all cases in the databases"
     *      )
     * )
     */

    Flight::route('GET /all', function(){
        $data = Flight::get('case_service')->get_all_cases();
        Flight::json($data,200);
    });

    /**
     * @OA\Get(
     *      path="/cases/case",
     *      tags={"Cases"},
     *      summary="Get case by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Information of the case by ID"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="caseID", example="1", description="Case ID")
     * )
     */

     Flight::route('GET /case', function(){
        $params = Flight::request()->query;

        $case = Flight::get('case_service')->get_case_by_id($params['caseID']);

        Flight::json($case);
    });

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

    /**
     * @OA\Post(
     *      path="/cases/add",
     *      tags={"Cases"},
     *      summary="Add case to the database",
     *      @OA\Response(
     *           response=200,
     *           description="Case data, or exception if case is not added properly"
     *      ),
     *      @OA\RequestBody(
     *           description="Case data",
     *           @OA\JsonContent(
     *             required={"date", "name", "description"},
     *             @OA\Property(property="caseID", type="number", example="1", description="Case ID (leave empty if adding new officer)"),
     *             @OA\Property(property="name", type="string", example="Case Example", description="Case name"),
     *             @OA\Property(property="date", type="string", example="2000-01-01", description="Case date made"),
     *             @OA\Property(property="description", type="string", example="Some dummy description", description="Case description")
     *          )
     *      )
     * )
     */


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

    /**
     * @OA\Delete(
     *      path="/cases/delete/{caseID}",
     *      tags={"Cases"},
     *      summary="Delete case by ID",
     *      @OA\Response(
     *           response=200,
     *           description="Deleteded case by ID data or 500 status code exception"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="caseID", example="1", description="Case ID")
     * )
     */


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