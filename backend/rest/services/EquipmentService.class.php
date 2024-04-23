<?php

require_once __DIR__ . "/../dao/EquipmentDao.class.php";
require_once __DIR__ . "/../dao/BaseDao.class.php";


class EquipmentService{
    private $equipment_dao;

    public function __construct(){
        $this->equipment_dao = new EquipmentDao("equipment");
    }

    public function add_equipment($equipment){
        return $this->equipment_dao->add_equipment($equipment);
    }

    public function get_equipment_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->equipment_dao->count_equipment_paginated($search)['count'];
        $rows = $this->equipment_dao->get_equipment_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            'count' => $count,
            'data' => $rows
        ];
    }

    public function delete_equipment_by_id($logID){
        $this -> equipment_dao ->delete_equipment_by_id($logID);
    }

    public function get_equipment_by_id($logID){
        return $this -> equipment_dao -> get_equipment_by_id($logID);
    }

    public function edit_equipment($equipment){
        $logID = $equipment['logID'];
        unset($equipment['logID']);
        
        $this->equipment_dao->edit_equipment($logID, $equipment);
    }
}