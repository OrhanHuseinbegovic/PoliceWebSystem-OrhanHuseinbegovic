<?php

require_once __DIR__ . "/../dao/IncidentDao.class.php";
require_once __DIR__ . "/../dao/BaseDao.class.php";

class IncidentService{
    private $incident_dao;

    public function __construct(){
        $this->incident_dao = new IncidentDao("incidents");
    }

    public function add_incident($incident){
        return $this->incident_dao->add_incident($incident);
    }

    public function get_incidents_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->incident_dao->count_incidents_paginated($search)['count'];
        $rows = $this->incident_dao->get_incidents_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            'count' => $count,
            'data' => $rows
        ];
    }

    public function delete_incident_by_id($incidentID){
        $this -> incident_dao ->delete_incident_by_id($incidentID);
    }

    public function get_incident_by_id($incidentID){
        return $this -> incident_dao -> get_incident_by_id($incidentID);
    }

    public function edit_incident($incident){
        $incidentID = $incident['incidentID'];
        unset($incident['incidentID']);
        
        $this->incident_dao->edit_incident($incidentID, $incident);
    }

    public function get_all_incidents(){
        return $this->incident_dao->get_all_incidents();
    }
}