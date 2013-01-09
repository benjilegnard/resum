<?php
//GET dates : renvoie une liste de dates
$app->get('/dates', function () use ($app) {
	echo 'This is a GET route';
});
//POST dates : créé une nouvelle
$app->post('/dates', function () {
    echo 'This is a POST route';
});

//PUT route
$app->put('/dates', function () {
    echo 'This is a PUT route';
});

//DELETE route
$app->delete('/dates(/:id)', function ($id) {
    echo 'This is a DELETE route';
});