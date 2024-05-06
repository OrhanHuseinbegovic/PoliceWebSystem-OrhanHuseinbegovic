<?php

require_once __DIR__ . "/BaseDao.class.php";


class CaseDao extends BaseDao{
    public function __constuct(){
        parent::__construct("cases");
    }

    
    public function add_case($case){
        return $this->insert("cases", $case);
    }
    

    public function count_cases_paginated($search) {
        $query = "SELECT COUNT(*) AS count
                  FROM cases
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') OR 
                        LOWER(description) LIKE CONCAT('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_cases_paginated($offset, $limit, $search, $order_column, $order_direction) {
        $query = "SELECT *
                  FROM cases
                  WHERE LOWER(name) LIKE CONCAT( :search, '%') OR 
                        LOWER(description) LIKE CONCAT( :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit}";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function delete_case_by_id($caseID) {
        $query = "DELETE FROM cases WHERE caseID = :caseID";
        $this->execute($query, [
            'caseID' => $caseID
        ]);
    }

    public function get_case_by_id($caseID) {
        return $this->query_unique("SELECT * FROM cases WHERE caseID = :caseID", [
            'caseID' => $caseID
        ]);
    }

    public function edit_case($caseID, $case) {
        $query = "UPDATE cases SET name=:name, description=:description, date=:date 
                  WHERE caseID = :caseID";

        $this->execute($query, [
            'name' => $case['name'],
            'description' => $case['description'],
            'date' => $case['date'],
            'caseID' => $caseID
        ]);
    }

    public function get_all_cases(){
        $query = "SELECT *
                  FROM cases;";
        return $this->query($query,[]);
    }

}

    
