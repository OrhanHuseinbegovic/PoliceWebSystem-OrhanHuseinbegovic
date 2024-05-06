<?php

require_once __DIR__ . "/BaseDao.class.php";

class SuspectDao extends BaseDao{
    public function __constuct(){
        parent::__construct("suspects");
    }

    
    public function add_suspect($suspect){
        //TODO IMPLEMENT ADD LOGIC
        /*
        $query = "INSERT INTO suspects (personalID,name,surname,dateOfBirth)
                  VALUES (:personalID,:name,:surname,:dateOfBirth)";
        $statement = $this->connection->prepare($query);
        $statement->execute($suspect);
        $patient['suspectID'] = $this->connection->lastInsertId();
        return $suspect;
        */
        return $this->insert("suspects", $suspect);
    }
    

    public function count_suspects_paginated($search) {
        $query = "SELECT COUNT(*) AS count
                  FROM suspects
                  WHERE LOWER(name) LIKE CONCAT('%', :search, '%') OR 
                        LOWER(surname) LIKE CONCAT('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }


    public function get_suspects_paginated($offset, $limit, $search, $order_column, $order_direction) {
        $query = "SELECT *
                  FROM suspects
                  WHERE LOWER(name) LIKE CONCAT( :search, '%') OR 
                        LOWER(surname) LIKE CONCAT( :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit}";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function delete_suspect_by_id($suspectID) {
        $query = "DELETE FROM suspects WHERE suspectID = :suspectID";
        $this->execute($query, [
            'suspectID' => $suspectID
        ]);
    }

    public function get_suspect_by_id($suspectID) {
        return $this->query_unique("SELECT * FROM suspects WHERE suspectID = :suspectID", [
            'suspectID' => $suspectID
        ]);
    }

    public function edit_suspect($suspectID, $suspect) {
        //Ako zelimo da se može i personal ID mijenjati (sto je u stvarnom ssvijetu nemoguce), potrebno je samo poslije
        //set dodati opet personalID=:personalID
        $query = "UPDATE suspects SET name=:name, surname=:surname, dateOfBirth=:dateOfBirth 
                  WHERE suspectID = :suspectID";

        $this->execute($query, [
            'name' => $suspect['name'],
            'surname' => $suspect['surname'],
            'dateOfBirth' => $suspect['dateOfBirth'],
            'suspectID' => $suspectID
        ]);
    }
    
    public function get_all_suspects(){
        $query = "SELECT *
                  FROM suspects;";
        return $this->query($query, []);
    }

}