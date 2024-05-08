<?php

require_once __DIR__ . "/BaseDao.class.php";

class OfficerDao extends BaseDao{
    public function __construct(){
        parent::__construct("officers");
    }

    public function add_officer($officer){
        unset($officer['repeat']);
        return $this->insert("officers", $officer);
    }

    public function count_officers_paginated($search) {
        $query = "SELECT COUNT(*) AS count
                  FROM officers
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') OR 
                        LOWER(surname) LIKE CONCAT('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_officers_paginated($offset, $limit, $search, $order_column, $order_direction) {
        $query = "SELECT *
                  FROM officers
                  WHERE LOWER(name) LIKE CONCAT( :search, '%') OR 
                        LOWER(surname) LIKE CONCAT( :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit}";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function delete_officer_by_id($officerID) {
        $query = "DELETE FROM officers WHERE officerID = :officerID";
        $this->execute($query, [
            'officerID' => $officerID
        ]);
    }

    public function get_officer_by_id($officerID) {
        return $this->query_unique("SELECT * FROM officers WHERE officerID = :officerID", [
            'officerID' => $officerID
        ]);
    }


    //TREBA OVU EDIT FUNCKIJU URADITI DA ADMIN MOŽE DA EDITUJE STATUS OFFICERA
    public function edit_officer($officerID, $officer) {
        $query = "UPDATE officers SET name=:name, surname=:surname, dateOfBirth=:dateOfBirth, isAdmin=:isAdmin, status=:status
                  WHERE officerID = :officerID";

        $this->execute($query, [
            'name' => $officer['name'],
            'surname' => $officer['surname'],
            'dateOfBirth' => $officer['dateOfBirth'],
            'isAdmin' => $officer['isAdmin'],
            'status' => $officer['status'],
            'officerID' => $officerID
        ]);
    }

    public function get_all_officers(){
        $query = "SELECT *
                  FROM officers;";
        return $this->query($query, []);
    }
}