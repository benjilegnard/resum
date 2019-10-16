.DEFAULT_GOAL := help

clean:  ## remove all dependencies and build directories
	rm -rf ./tests/node_modules
	rm -rf ./client/node_modules
	rm -rf ./client/dist
	rm -rf ./server/vendor

install-client: ## install client dependencies
	cd client
	npm install

install-server: ## install server dependencies
	cd server
	composer install

test-client: ## run client tests
	cd ./client && npm run test

test-server: ## run server tests
	cd ./server && composer test

build: ## Builds docker images from the current project files
	docker-compose build 

build-ci: ## Builds docker images from the current project files
	docker-compose build --no-cache

up: ## Creates and starts the docker containers with development settings
	docker-compose -f docker-compose.yml up -d
	docker-compose ps

down: ## Stops and removes the docker containers
	docker-compose down

logs: ## Get logs from docker composer
	docker-compose logs

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
