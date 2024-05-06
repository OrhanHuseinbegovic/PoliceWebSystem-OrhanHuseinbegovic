<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="Police Web System API",
 *   version="1.0",
 *   @OA\Contact(
 *     email="orhan.huseinbegovic@ibu.edu.ba",
 *     name="Orhan Huseinbegovic"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKeyAuth",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */
