<?php

// todo remove later, deprecated warnings popups mainly because of intval being deprecated :
// solution: either use another lib for graphics, or use gd directly
// see: https://php.watch/versions/8.1/deprecate-implicit-conversion-incompatible-float-string
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);

require __DIR__ . '/../vendor/autoload.php';

$app = new FrameworkX\App();

$app->get('/', function () {
    return React\Http\Message\Response::plaintext("Hello wörld!\n");
});

$app->get('/thumbnails/{seed}.png', function (
    Psr\Http\Message\ServerRequestInterface $request
) {
    // seeds the random number generator from params
    $seed = intval($request->getAttribute('seed'));
    mt_srand($seed);

    // create image from thumbnail
    $image = new PHPImage();
    $background = __DIR__ . '/__assets__/thumbnail.png';
    $image->setDimensionsFromImage($background);
    $image->draw($background);

    // draw random stuff
    $maxWidth = 600;
    $maxHeight = 315;
    for ($i = 1; $i <= 50; $i++) {
        $x = mt_rand(0, $maxWidth);
        $y = mt_rand(0, $maxHeight);
        $width = mt_rand(5, 100);
        $opacity = mt_rand(5, 20) / 100;
        $image->circle($x, $y, $width, [255, 255, 255], $opacity);
    }

    // additional filters
    imagefilter($image->getResource(), IMG_FILTER_SMOOTH, 10);

    // colorize image
    $colors = [
        [255, 0, mt_rand(0, 255)],
        [0, 255, mt_rand(0, 255)],
        [0, mt_rand(0, 255), 255],
        [255, mt_rand(0, 255), 0],
        [mt_rand(0, 255), 0, 255],
        [mt_rand(0, 255), 255, 0],
    ];
    $randomIndex = mt_rand(0, 5);
    imagefilter(
        $image->getResource(),
        IMG_FILTER_COLORIZE,
        $colors[$randomIndex][0],
        $colors[$randomIndex][1],
        $colors[$randomIndex][2],
        110
    );

    // re-draw transparent image over generated one
    $overlay = __DIR__ . '/__assets__/thumbnail-overlay.png';
    $image->draw($overlay);

    // end of generation, pass to output
    $gdImage = $image->getResource();

    // use an output buffer to avoid the image to be send directly
    ob_start();
    imagepng($gdImage, null, 9); // pass null to supposedly write to stdout
    $generatedImage = ob_get_clean();
    $image->cleanup();

    // return stream to Response
    return new React\Http\Message\Response(
        React\Http\Message\Response::STATUS_OK,
        ['Content-type' => 'image/png'],
        $generatedImage
    );
});

$app->run();
