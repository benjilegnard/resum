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
* ngrx
* apollo-graphql
* ckeditor
* sass

### Server

* SlimPHP
* Graphql
* Eloquent

### Database

* MariaDB / MySQL
* 