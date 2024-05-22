<?php

require __DIR__ . '/../../../vendor/autoload.php';

//define('BASE_URL', 'https://walrus-app-x43wn.ondigitalocean.app/policewebsystem-orhanhuseinbego2/');

//define('BASE_URL', 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/');

if($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1'){
    define('BASE_URL', 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/');
}else{
    define('BASE_URL', 'https://walrus-app-x43wn.ondigitalocean.app/policewebsystem-orhanhuseinbego2/');
}


error_reporting(0);

$openapi = \OpenApi\Generator::scan(['../../../rest/routes', './']);
header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>
