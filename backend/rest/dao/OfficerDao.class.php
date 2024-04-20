<?php

require_once __DIR__ . "/BaseDao.class.php";

class OfficerDao extends BaseDao{
    public function __construct(){
        parent::__construct("officers");
    }

    public function addOfficer($officer){
        //TODO implenent add logic
        
        return $officer;
    }
}