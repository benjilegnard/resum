<?php
use DI\Container;
use Illuminate\Database\Capsule\Manager as Capsule;
use Slim\Factory\AppFactory;

// Create Container using PHP-DI
$container = new Container();

// Set container to create App with on AppFactory
AppFactory::setContainer($container);

$container->set('config', function () {
    return [];
});
// Database entry point
$container->set('database', function () {
    // run Eloquent ORM without laravel with capsule :
    $capsule = new Capsule;

    $capsule->addConnection([
       "driver" => "mysql",
       "host" =>"127.0.0.1",
       "database" => "resum",
       "username" => "resum",
       "password" => "resum"
    ]);
    
    // Make this Capsule instance available globally.
    $capsule->setAsGlobal();
    
    // Setup the Eloquent ORM.
    $capsule->bootEloquent();

    return $capsule;
});
