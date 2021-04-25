.DEFAULT_GOAL := help

clean:  ## remove all dependencies and build directories
	rm -rf ./tests/node_modules
	rm -rf ./client/node_modules
	rm -rf ./client/dist
	rm -rf ./server/vendor

install-client: ## install client dependencies
	cd ./client && npm install

install-server: ## install server dependencies
	cd ./server && composer install

test-client: ## run client tests
	cd ./client && npm run test

test-server: ## run server tests
	cd ./server && composer test

build: ## Builds docker images from the current project files
	docker-compose build 

ci: ## Builds docker images from the current project files
	cp -f ./env.dist .env \
	&& docker-compose build

up: ## Creates and starts the docker containers with development settings
	docker-compose -f docker-compose.yml up -d \
	&& docker-compose ps

down: ## Stops and removes the docker containers
	docker-compose down

logs: ## Get logs from docker composer
	docker-compose logs

api-client: # generate client from openapi
	docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/2_0/petstore.yaml \
    -g typescript-angular \
    -o /local/generated/client

api-server: # generate server from openapi
	docker run --rm \
	-v "${PWD}:/local" \
	openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/2_0/petstore.yaml \
    -g php-lumen \
    -o /local/generated/server

api-editor:
	docker run -d -p 8080:8080 swaggerapi/swagger-editor -v .:/tmp -e SWAGGER_FILE=/tmp/resum.openapi.yml

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
