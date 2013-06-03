<?php
error_reporting(E_ALL);
ini_set("display_errors","On");
ini_set("display_startup_errors","On");
date_default_timezone_set("Europe/Paris");

set_include_path(get_include_path() . PATH_SEPARATOR . "./vendor");
define('ROOT', dirname('./.'));
define('WEBROOT', ROOT.'/public/');
define('DEBUG',true);

require './vendor/autoload.php';

//imports :
// Slim microframework and extensions
use \Slim\Slim;
use \Slim\Extras as SlimExtras;
use dflydev\markdown\MarkdownExtraParser;
use \Assetic\Extension\Twig\AsseticExtension;



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

use Assetic\AssetManager;
use Assetic\Asset\AssetCollection;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;
//new resources factory
$factory = new \Assetic\Factory\AssetFactory(ROOT."/public");

//less to css
SlimExtras\Views\Twig::$twigExtensions = array(
    'Twig_Extensions_Slim',
    'Twig_Extension_Debug',
    new AsseticExtension($factory, array() )
);


/**
 * Notre application.
 */
$app = new Slim(array(
    'templates.path' => './public/tpl/',
    'debug' => DEBUG,
    'view' => new SlimExtras\Views\Twig(),
    'cookies.secret_key' => md5('appsecretkey'),

    'log.enabled'    => true,
    'log.writer' => new SlimExtras\Log\DateTimeFileWriter(array(
        'path' => './logs',
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
//allows the app to be installed in / or /[subPath]/
$rootUri = $app->request()->getRootUri();
$assetUri = $rootUri.'/public';
$app->view()->appendData(
    array(
        'app' => $app,
        'rootUri' => $rootUri,
        'debug' => true,
        'assetUri' => $assetUri,
        'resourceUri' => $resourceUri
    ));


//api rest / json, adds a json file in src/data and its name here to enable it.
$rest = array("icons","jobs","nodes","pages","slides","timeline");

// Assetic for static resources management.
use Assetic\Asset\AssetCollection;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;
//main
$app->get('/', function () use ($app) {

    //we can ask for /page.html or /page
    $app->getLog()->debug("HTML request");
    $app->render('index.twig');
});
//load javascript files with Assetic
$app->get('/js/:path.js', function ($path) use ($app){

    $app->getLog()->debug("JS request for : ".$path);

    $js = new AssetCollection(array(
        new FileAsset("/js/$path.js")
    ));

    echo $js->dump();
});

//load less files with Assetic
$app->get('/css/:path.css', function ($path) use ($app){
    $app->getLog()->debug("CSS request for : ".$path);
    $css = new AssetCollection(array(
        new FileAsset("./public/css/$path.css"),
    ));

    $css->dump();

    $css = new AssetCollection(array(
        new FileAsset("/less/$path.less")
    ));

    echo $css->dump();
});
//load img files with Assetic
$app->get('/js/:path.:ext', function($path,$ext) use ($app){
    $app->getLog()->debug("Image request for : ".$path." with extension : ".$ext);

    $img = new AssetCollection(array(
        new FileAsset("/img/$path.$ext")
    ));

    echo $img->dump();
});
*/
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
