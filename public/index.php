<?php
error_reporting(E_ALL);
ini_set("display_errors","On");
ini_set("display_startup_errors","On");
date_default_timezone_set("Europe/Paris");

set_include_path(get_include_path() . PATH_SEPARATOR . "./vendor");
define('ROOT', dirname('./..'));
define('DEBUG',true);

require '../vendor/autoload.php';

use \Slim\Slim;
use \Slim\Middleware\Less;
use \Slim\Extras as SlimExtras;
use dflydev\markdown\MarkdownExtraParser;

Slim::registerAutoloader();

/**
 * TWIG SETTINGS
 */
SlimExtras\Views\Twig::$twigDirectory = ROOT.'/vendor/Twig/lib/Twig';
SlimExtras\Views\Twig::$twigOptions = array(
    "debug" => DEBUG
);
if(is_writable(ROOT . '/cache/twig')) {
    SlimExtras\Views\Twig::$twigOptions['cache'] = ROOT . '/cache/twig';
}


SlimExtras\Views\Twig::$twigExtensions = array(
    'Twig_Extensions_Slim',
    'Twig_Extension_Debug'
);


/**
 * Notre application.
 */
$app = new Slim(array(
    'templates.path' => './tpl/',
    'debug' => DEBUG,
    'view' => new SlimExtras\Views\Twig(),
    'cookies.secret_key' => md5('appsecretkey'),

    'log.enabled'    => true,
    'log.writer' => new SlimExtras\Log\DateTimeFileWriter(array(
        'path' => '../logs',
        'name_format' => 'Y-m-d',
        'message_format' => '%label% - %date% - %message%'
    ))
));
$app->setName('resum');

/*
 * Fonction utilitaire retournant le contenu d'un fichier json
 *
 * @param $entity
 * @return mixed
 */
$getData = function($entity) use($app){
    $filePath = ROOT.'/data/' . $entity . '.json';
    $app->getLog()->debug("entity param is OK, opening file ". $filePath);

    $fileContent = file_get_contents(  $filePath );
    $data = json_decode( $fileContent , true );
    //$app->getLog()->debug($data);
    return $data;
};
/*
 * Fournit des données globales aux vues
 */
$resourceUri = $_SERVER['REQUEST_URI'];
$rootUri = $app->request()->getRootUri();
$assetUri = $rootUri;
$app->view()->appendData(
    array(
        'app' => $app,
        'rootUri' => $rootUri,
        'debug' => true,
        'assetUri' => $assetUri,
        'resourceUri' => $resourceUri
    ));

$app->add(new Less(array(
    'src' => ROOT . '/public/',
    'cache' => true,
    'cache.dir' => ROOT . '/cache/less',
    'minify' => true,
    'debug' => DEBUG
)));

//main
$app->get('/', function () use ($app) {

    //we can ask for /page.html or /page
    $app->getLog()->debug("HTML request");
    $app->render('index.twig');
});
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


$app->run();