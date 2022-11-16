# Resum

This is my personal resume / site / blog.

## Architecture

The project is composed of three main modules / docker images.

- client : the angular app frontend, running in an nginx container
- server : a php graphql api, running with php-fpm
- tests  : performance and end-to-end tests requiring the app to be running
- archive: is where i store my old versions of this resume, look at it, it's fun and has not aged very well

## Tech Stack


### Client

* angular
* scully
* sass

### Server

* Framework-x: the core framework to respond to requests
* Pest: for unit tests
* PHP 8.1, modules required : gd, xml

### Database

* MariaDB / MySQL
* 

## Installation

### Pre-requisites

- PHP 8.1

For the server, needed extension : 

    sudo apt install php8.1-gd php8.1-cli php8.1-xdebug php8.1-xml composer

### build it

