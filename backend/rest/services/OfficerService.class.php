<?php

require_once __DIR__ . "/../dao/OfficerDao.class.php";    

class OfficerService{
    private $officerDao;

    public function __construct(){
        $this->officerDao = new OfficerDao();
    }

    public function addOfficer($officer){
        return $this->officerDao->addOfficer($officer);
    }
}