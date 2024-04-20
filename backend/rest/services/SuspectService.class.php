<?php

require_once __DIR__ . "/../dao/SuspectDao.class.php";
require_once __DIR__ . "/../dao/BaseDao.class.php";

class SuspectService{
    private $suspect_dao;

    public function __construct(){
        $this->suspect_dao = new SuspectDao("suspects");
    }


    public function add_suspect($suspect){
        return $this->suspect_dao->add_suspect($suspect);
    }

    public function get_suspects_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->suspect_dao->count_suspects_paginated($search)['count'];
        $rows = $this->suspect_dao->get_suspects_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            'count' => $count,
            'data' => $rows
        ];
    }
    //MOZDA I OVJDE TREBA delete_suspect_by_id odmah ispod
    public function delete_suspect_by_id($suspect_id){
        $this -> suspect_dao ->delete_suspect_by_id($suspect_id);
    }

    public function get_suspect_by_id($suspect_id){
        //mozda ne treba return ovde
        return $this -> suspect_dao -> get_suspect_by_id($suspect_id);
    }

    public function edit_suspect($suspect){
        $suspectID = $suspect['suspectID'];
        unset($suspect['suspectID']);
        
        $this->suspect_dao->edit_suspect($suspectID, $suspect);
    }
}

