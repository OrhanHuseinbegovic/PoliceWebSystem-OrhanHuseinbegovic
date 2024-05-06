<?php

require_once __DIR__ . "/BaseDao.class.php";

class EquipmentDao extends BaseDao{
    public function __constuct(){
        parent::__construct("equipment");
    }

    
    public function add_equipment($equipment){
        return $this->insert("equipment", $equipment);
    }
    

    public function count_equipment_paginated($search) {
        $query = "SELECT COUNT(*) AS count
                  FROM equipment
                  WHERE LOWER(weapon) LIKE CONCAT('%', :search, '%') OR 
                        LOWER(vehicle) LIKE CONCAT('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_equipment_paginated($offset, $limit, $search, $order_column, $order_direction) {
        $query = "SELECT *
                  FROM equipment
                  WHERE LOWER(weapon) LIKE CONCAT( :search, '%') OR 
                        LOWER(vehicle) LIKE CONCAT( :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit}";
        return $this->query($query, [
            'search' => $search
        ]);
    }
    
    public function delete_equipment_by_id($logID) {
        $query = "DELETE FROM equipment WHERE logID = :logID";
        $this->execute($query, [
            'logID' => $logID
        ]);
    }

    public function get_equipment_by_id($logID) {
        return $this->query_unique("SELECT * FROM equipment WHERE logID = :logID", [
            'logID' => $logID
        ]);
    }

    public function edit_equipment($logID, $log) {
        $query = "UPDATE equipment SET weapon=:weapon, vehicle=:vehicle, shift=:shift 
                  WHERE logID = :logID";

        $this->execute($query, [
            'weapon' => $log['weapon'],
            'vehicle' => $log['vehicle'],
            'shift' => $log['shift'],
            'logID' => $logID
        ]);
    }

    public function get_all_equipment(){
        $query = "SELECT *
                  FROM equipment;";
        return $this->query($query, []);
    }
}