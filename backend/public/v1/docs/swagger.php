<?php

require __DIR__ . '/../../../vendor/autoload.php';

define('BASE_URL', 'https://walrus-app-x43wn.ondigitalocean.app/backend/');

//define('BASE_URL', 'http://localhost/PoliceWebSystem-OrhanHuseinbegovic/backend/');

error_reporting(0);

$openapi = \OpenApi\Generator::scan(['../../../rest/routes', './']);
header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>
