<?php

require_once __DIR__ . '/../services/AuthService.class.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set('auth_service', new AuthService());

Flight::group('/auth', function(){
    /**
     * @OA\Post(
     *      path="/auth/login",
     *      tags={"Auth"},
     *      summary="Authenticate user",
     *      @OA\Response(
     *           response=200,
     *           description="Officer data and JWT"
     *      ),
     *      @OA\RequestBody(
     *           description="Credentials",
     *           @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="johndoe@police.com", description="Officer email"),
     *             @OA\Property(property="password", type="string", example="123456789", description="Officer password")
     *          )
     *      )
     * )
     */
    Flight::route('POST /login', function(){
        $payload = Flight::request()->data->getData();

        /*
        if(empty($payload['password']) || empty($payload['email'])){
            Flight::halt(500, "Password or email not sent!");
        }
        */
        

        if($payload['password'] === "" || $payload['email'] === ""){
            Flight::halt(500, "Password or email not sent!");
        }

        $officer = Flight::get('auth_service')->get_user_by_email($payload['email']);
        
        if($officer === false) {
            Flight::halt(404, "User not found");
        }
        
        if($officer['status']=="onhold"){
            Flight::halt(500, "User is not accepted"); 
        }

        // Password check
        
        //takodjer, treba provjeriti i dal i je admin ili nije ali u js kodu

        if(!$officer || !password_verify($payload['password'], $officer['password']))
            Flight::halt(500, "Invalid username or password");
        
        unset($officer['password']);


        $jwt_payload = [
            'user' => $officer,
            'iat' => time(),
            'exp' => time()+(60*60*24) //valid for day
        ];

        $token = JWT::encode(
            $jwt_payload,
            Config::JWT_SECRET(),
            'HS256'
        );

        Flight::json(
            array_merge($officer, ['token' => $token])
        );
    });


    /**
     * @OA\Post(
     *      path="/auth/logout",
     *      tags={"Auth"},
     *      summary="Log out user from system",
     *      security={
     *          {"ApiKeyAuth": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Success response or exception if unable to verify JWT token"
     *      )
     * )
     */

    Flight::route('POST /logout', function(){
        try{
            $token = Flight::request()->getHeader('Authorization');
            if(!$token)
                Flight::halt(401, "Missing Authorization header");

            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

            Flight::json([
                'jwt_decoded' => $decoded_token,
                'user' => $decoded_token->user
            ]);
        
        }catch(Exception $e){
            Flight::halt(401, $e->getMessage());
        }
    });
});