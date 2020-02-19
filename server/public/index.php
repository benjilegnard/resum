<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Illuminate\Support\Facades\DB;

use GraphQL\GraphQL;
use GraphQL\Utils\BuildSchema;
use GraphQL\Validator\Rules;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../app/config/containers.php';

$app = AppFactory::create();

// Add Error Handling Middleware
$app->addErrorMiddleware(true, false, false);

// serve graphiql
$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write(file_get_contents(__DIR__ . '/../app/graphiql/index.html'));
    return $response->withHeader('Content-Type', 'text/html');
});

$app->post('/graphql', function (Request $request, Response $response, array $args) {
    $schema = BuildSchema::build(file_get_contents(__DIR__ . '/../app/schema.graphql'));
    $input = json_decode($request->getBody(), true);
    $queryString = isset($input['query']) ? $input['query'] : null;
    $variableValues = isset($input['variables']) ? $input['variables'] : null;

    $validationRules = array_merge(
        GraphQL::getStandardValidationRules(),
        [
            new Rules\QueryComplexity(100),
            new Rules\DisableIntrospection()
        ]
    );
    
    $result = GraphQL::executeQuery(
        $schema,
        $queryString,
        $rootValue = null,
        $context = null,
        $variableValues = null,
        $operationName = null,
        $fieldResolver = null,
        $validationRules // <-- this will override global validation rules for this request
    );
    // $payload = json_encode(['status' => true], JSON_PRETTY_PRINT);
    $response->getBody()->write(json_encode($result));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/health', function (Request $request, Response $response, array $args) {
    $table = $this->get('database')->table('resum_users');
    $payload = json_encode(['status' => true, 'database' => $table], JSON_PRETTY_PRINT);
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();