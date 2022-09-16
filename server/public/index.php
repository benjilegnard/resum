<?php

require __DIR__ . '/../vendor/autoload.php';

$app = new FrameworkX\App();

$app->get('/', function () {
    return React\Http\Message\Response::plaintext("Hello wörld!\n");
});

$app->get('/users/{name}', function (
    Psr\Http\Message\ServerRequestInterface $request
) {
    return React\Http\Message\Response::plaintext(
        'Hello ' . $request->getAttribute('name') . "!\n"
    );
});

$app->run();
