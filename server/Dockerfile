
### STAGE 1: Build ###

# We label our stage as 'builder'
FROM composer:2.2.6 as builder

COPY composer.lock .
COPY composer.json .

## Storing vendor dir on a separate layer will prevent unnecessary installs at each build
RUN composer install --no-dev && mkdir /blg-api && mv ./vendor /blg-api/

### STAGE 2: Setup ###

FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd

COPY --from=builder /blg-api/* /var/www/vendor/

COPY ./public /var/www/html/


RUN rm -rf /var/www/html/logs/* \
    && chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html

RUN a2enmod rewrite

EXPOSE 80

#CMD ["php" , "-S", "0.0.0.0:8888", "-t", "public", "public/index.php"]
