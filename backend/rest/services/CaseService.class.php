<?php


require_once __DIR__ . "/../dao/CaseDao.class.php";
require_once __DIR__ . "/../dao/BaseDao.class.php";


class CaseService{
    private $case_dao;

    public function __construct(){
        $this->case_dao = new CaseDao("cases");
    }

    public function add_case($case){
        return $this->case_dao->add_case($case);
    }

    public function get_cases_paginated($offset, $limit, $search, $order_column, $order_direction){
        $count = $this->case_dao->count_cases_paginated($search)['count'];
        $rows = $this->case_dao->get_cases_paginated($offset, $limit, $search, $order_column, $order_direction);

        return [
            'count' => $count,
            'data' => $rows
        ];
    }

    public function delete_case_by_id($caseID){
        $this -> case_dao ->delete_case_by_id($caseID);
    }

    public function get_case_by_id($caseID){
        //mozda ne treba return ovde
        return $this -> case_dao -> get_case_by_id($caseID);
    }

    public function edit_case($case){
        $caseID = $case['caseID'];
        unset($case['caseID']);
        
        $this->case_dao->edit_case($caseID, $case);
    }
}
