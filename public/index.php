<?php
error_reporting(E_ALL);
ini_set("display_errors","On");
ini_set("display_startup_errors","On");
date_default_timezone_set("Europe/Paris");


set_include_path(get_include_path() . PATH_SEPARATOR . "./vendor");
define('ROOT', dirname('./..'));

require '../vendor/autoload.php';
\Slim\Slim::registerAutoloader();

/**
 * TWIG SETTINGS
 */


\Slim\Extras\Views\Twig::$twigDirectory = ROOT.'/vendor/Twig/lib/Twig';
\Slim\Extras\Views\Twig::$twigOptions = array(
    "debug" => true
);
if(is_writable(ROOT . '/cache/twig')) {
    \Slim\Extras\Views\Twig::$twigOptions['cache'] = ROOT . '/cache/twig';
}


\Slim\Extras\Views\Twig::$twigExtensions = array(
    'Twig_Extensions_Slim',
    'Twig_Extension_Debug'
);

$app = new \Slim\Slim(array(
    'templates.path' => '../views/',
    'debug' => false,
    'view' => new \Slim\Extras\Views\Twig(),
    'cookies.secret_key' => md5('appsecretkey'),

    'log.enabled'    => true,
    'log.writer' => new \Slim\Extras\Log\DateTimeFileWriter(array(
        'path' => '../logs',
        'name_format' => 'Y-m-d',
        'message_format' => '%label% - %date% - %message%'
    ))
));
$app->setName('resum');


/**
 * Automatic login based on user cookie
 * uncomment when user model has been defined
 */
$currentUser = null;
if($userid = $app->getEncryptedCookie('user_id')) {
    /*if(User::exists($userid)) {
         $currentUser = User::find($userid);
     } else {
         $currentUser = null;
     }
     */

} else {
    $currentUser = null;
}

$getData = function($entity) use($app){
    $filePath = ROOT.'/data/' . $entity . '.json';
    $app->getLog()->debug("entity param is OK, opening file ". $filePath);

    $fileContent = file_get_contents(  $filePath );
    $data = json_decode( $fileContent , true );
    //$app->getLog()->debug($data);
    return $data;
};
/*
 * SET some globally available view data
 */
$resourceUri = $_SERVER['REQUEST_URI'];
$rootUri = $app->request()->getRootUri();
$assetUri = $rootUri;
$app->view()->appendData(
    array('currentUser' => $currentUser,
        'app' => $app,
        'rootUri' => $rootUri,
        'assetUri' => $assetUri.'/public/',
        'resourceUri' => $resourceUri
    ));

foreach(glob(ROOT.'/src/controllers/*.php') as $router) {
    include $router;
}

//api rest / json, adds a json file in src/data and its name here to enable it.
$rest = array("icons","jobs","nodes","pages","slides","timeline");

//one fonction to rule them all
$app->map(
    '/api(/:entity)(/:id)(/:action)',
    function($entity, $id = null, $action = null) use ($app, $rest, $getData)
    {
        $app->getLog()->debug("API request");
        $app->getLog()->debug("entity\t:\t".$entity);
        $app->getLog()->debug("id\t:\t".$id);
        $app->getLog()->debug("action\t:\t".$action);

        if(in_array($entity, $rest)) {
            //ouverture du fichier json.
            $data = $getData($entity);
            //tri en fonction des params
            if(isset($id)){
                //on va chercher l'entité $id
                $foundIt = $data[$entity][(int) $id];
                if(isset($foundIt)){
                    $app->getLog()->info("Found $entity with id $id");
                    $data = $data[$entity][$id];
                }else{
                    $app->getLog()->warn("$entity with id $id doesn't exists");
                }

            }else{
                //pas d'id, action sur la liste de tous les items
                $data = $data[$entity];
            }


            //si action particulière fournie par l'api.
            if(isset($action)){

            }
            //réponse
            $app->contentType('application/json');
            $app->response()->body( json_encode($data) );

        }else{
            $app->error(404);
        }
    }
)->via(
    'GET',
    'POST',
    'PUT',
    'DELETE'
)->conditions(
    array('id' => '\d+')
);

//main page
$app->get('/(:path)(.html)', function ($path = null) use ($app, $rest) {
    $app->getLog()->debug("HTML request");
    $app->render('intro.html.twig');
});

$app->run();