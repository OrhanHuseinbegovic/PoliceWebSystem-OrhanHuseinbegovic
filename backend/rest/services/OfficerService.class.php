<?php

require_once __DIR__ . "/../dao/OfficerDao.class.php";
require_once __DIR__ . "/../dao/BaseDao.class.php";
  
class OfficerService{
    private $officer_dao;

    public function __construct(){
        $this->officer_dao = new OfficerDao("officers");
    }

    public function add_officer($officer){
        return $this->officer_dao->add_officer($officer);
    }

    public function get_officers_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->officer_dao->count_officers_paginated($search)['count'];
        $rows = $this->officer_dao->get_officers_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            'count' => $count,
            'data' => $rows
        ];
    }

    public function delete_officer_by_id($officerID){
        $this -> officer_dao ->delete_officer_by_id($officerID);
    }

    public function get_officer_by_id($officerID){
        return $this -> officer_dao -> get_officer_by_id($officerID);
    }

    public function edit_officer($officer){
        $officerID = $officer['officerID'];
        unset($officer['officerID']);
        
        $this->officer_dao->edit_officer($officerID, $officer);
    }

    public function get_all_officers(){
        return $this->officer_dao->get_all_officers();
    }
}