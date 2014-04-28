<?php

// router.php for the built-in php web server.
$path = pathinfo($_SERVER["SCRIPT_FILENAME"]);
if ($path["extension"] == "ogg")
{
    header("Content-Type: video/ogg");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else if ($path["extension"] == "json")
{
    header("Content-Type: application/json");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else if ($path["extension"] == "css")
{
    return FALSE;
}
else
{
    return FALSE;
}
