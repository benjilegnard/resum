<?php
/**
 * Created by IntelliJ IDEA.
 * User: BELEGRAN
 * Date: 11/12/13
 * Time: 11:34
 * To change this template use File | Settings | File Templates.
 */
// bootstrap.php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once "vendor/autoload.php";

// Create a simple "default" Doctrine ORM configuration for Annotations
$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"), $isDevMode);
// or if you prefer yaml or XML
//$config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config/xml"), $isDevMode);
//$config = Setup::createYAMLMetadataConfiguration(array(__DIR__."/config/yaml"), $isDevMode);

// database configuration parameters
$conn = array(
    'driver' => 'pdo_pgsql',
    'host' => 'localhost',
    'port' => 5432,
    'dbname' => 'resum',
    'user' => 'resum',
    'password' => 'resum'
);

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);