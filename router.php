<?php

// router.php
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
else
{
    return FALSE;
}
