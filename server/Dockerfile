
### STAGE 1: Build ###

# We label our stage as 'builder'
FROM composer:1.9 as builder


# COPY composer.json composer.lock ./
COPY . .

## Storing vendor dir on a separate layer will prevent unnecessary installs at each build
RUN composer install && mkdir /slim-app && mv ./vendor ./slim-app/

## Move to /slim-app (eq: cd /slim-app)
#WORKDIR /slim-app



### STAGE 2: Setup ###

FROM php:7.3-fpm-alpine

COPY --from=builder /slim-app/ /var/www/html/

# Copy everything from host to /slim-app in the container
COPY . ./var/www/html

RUN rm -rf /var/www/html/logs/* \
    && chown -R www-data:www-data /var/www/html

EXPOSE 8080
