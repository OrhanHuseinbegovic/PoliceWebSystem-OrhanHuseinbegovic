<?php

//Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

//Database access credentials
define('DB_NAME',  'police');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', 'Orhanorhan22');
define('DB_HOST', 'localhost');


//JWT SECRET    
define('JWT_SECRET', '7b:Y:56QiiHBv7gZ8tWK(P2XGYw1;1');


