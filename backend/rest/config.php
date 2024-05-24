<?php

//Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));


class Config{
    public static function DB_NAME(){
        return Config::get_env('DB_NAME','police');
    }
    public static function DB_PORT(){
        return Config::get_env('DB_PORT',3306);
    }
    public static function DB_USER(){
        return Config::get_env('DB_USER', 'root');
    }
    public static function DB_PASSWORD(){
        return Config::get_env('DB_PASSWORD', 'Orhanorhan22');
    }
    public static function DB_HOST(){
        return Config::get_env('DB_HOST', 'localhost');
    }
    public static function JWT_SECRET(){
        return Config::get_env('JWT_SECRET', '7b:Y:56QiiHBv7gZ8tWK(P2XGYw1;1');
    }
    public static function get_env($name, $default) {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default; // Corrected conditional statement
    }
}

/*
//Database access credentials
define('DB_NAME',  'police');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', 'Orhanorhan22');
define('DB_HOST', 'localhost');


//JWT SECRET    
define('JWT_SECRET', '7b:Y:56QiiHBv7gZ8tWK(P2XGYw1;1');
*/

