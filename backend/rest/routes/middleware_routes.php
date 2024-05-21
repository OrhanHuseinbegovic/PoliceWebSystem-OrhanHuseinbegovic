<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route('/*', function(){
    if(strpos(Flight::request()->url, '/auth/login') === 0 || strpos(Flight::request()->url, '/swagger') === 0 || strpos(Flight::request()->url, '/officers/add') === 0){
        return TRUE;
    }else{
        try{
            $token = Flight::request()->getHeader('Authentication');
            if(!$token)
                Flight::halt(401, "Missing authentication header");

            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

            Flight::set('user', $decoded_token->user);
            Flight::set('jwt_token', token);
            return TRUE;
        }catch(Exception $e){
            Flight::halt(401, $e->getMessage());
        }
    }    
});


/*
Flight::map('error', function(){
    //We want to log every error that happens, so we can Investigate those logs, try to fix them, ant etc, we can log them to the database or to the file
    //usually in the production environment, we log them to the file, and in the development environment, we log them to the database
    file_put_contents('logs.txt', $e -> getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);
    Flight::halt($e->getCode(), $e->getMessage());
    Flight::stop($e->getCode());
});
*/