<?php

require_once __DIR__ . "/BaseDao.class.php";

class IncidentDao extends BaseDao{
    public function __constuct(){
        parent::__construct("incidents");
    }

    
    public function add_incident($incident){
        return $this->insert("incidents", $incident);
    }
    

    public function count_incidents_paginated($search) {
        $query = "SELECT COUNT(*) AS count
                  FROM incidents
                  WHERE LOWER(type) LIKE CONCAT('%', :search, '%') OR 
                        LOWER(location) LIKE CONCAT('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }


    public function get_incidents_paginated($offset, $limit, $search, $order_column, $order_direction) {
        $query = "SELECT *
                  FROM incidents
                  WHERE LOWER(type) LIKE CONCAT( :search, '%') OR 
                        LOWER(location) LIKE CONCAT( :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit}";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function delete_incident_by_id($incidentID) {
        $query = "DELETE FROM incidents WHERE incidentID = :incidentID";
        $this->execute($query, [
            'incidentID' => $incidentID
        ]);
    }

    public function get_incident_by_id($incidentID) {
        return $this->query_unique("SELECT * FROM incidents WHERE incidentID = :incidentID", [
            'incidentID' => $incidentID
        ]);
    }

    public function edit_incident($incidentID, $incident) {
        $query = "UPDATE incidents SET type=:type, location=:location, description=:description , date=:date 
                    WHERE incidentID = :incidentID";

        $this->execute($query, [
            'type' => $incident['type'],
            'location' => $incident['location'],
            'description' => $incident['description'],
            'date' => $incident['date'],
            'incidentID' => $incidentID
        ]);
        
    }
}


