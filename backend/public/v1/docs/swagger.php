<?php

require __DIR__ . '/../../../vendor/autoload.php';

if($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1'){
    define('BASE_URL', 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/');
}
else{
    //define('BASE_URL', $_SERVER['SERVER_NAME'] . '/backend/');
    define('BASE_URL', 'https://squid-app-b38k5.ondigitalocean.app/backend/');
}

//define('BASE_URL', 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/');

error_reporting(0);

$openapi = \OpenApi\Generator::scan(['../../../rest/routes', './']);
header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>
