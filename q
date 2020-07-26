[1mdiff --git a/.gitignore b/.gitignore[m
[1mindex d9a8eac..9b15485 100644[m
[1m--- a/.gitignore[m
[1m+++ b/.gitignore[m
[36m@@ -8,4 +8,5 @@[m [mvendor/[m
 *.iml[m
 *.log[m
 *.zip[m
[31m-.env[m
\ No newline at end of file[m
[32m+[m[32m.env[m
[32m+[m[32mgenerated/[m
\ No newline at end of file[m
[1mdiff --git a/Makefile b/Makefile[m
[1mindex 95eb25b..f7cbfd7 100644[m
[1m--- a/Makefile[m
[1m+++ b/Makefile[m
[36m@@ -21,13 +21,13 @@[m [mtest-server: ## run server tests[m
 build: ## Builds docker images from the current project files[m
 	docker-compose build [m
 [m
[31m-build-ci: ## Builds docker images from the current project files[m
[31m-    cp ./env.dist .env[m
[31m-	docker-compose build --no-cache[m
[32m+[m[32mci: ## Builds docker images from the current project files[m
[32m+[m	[32mcp -f ./env.dist .env \[m
[32m+[m	[32m&& docker-compose build[m
 [m
 up: ## Creates and starts the docker containers with development settings[m
[31m-	docker-compose -f docker-compose.yml up -d[m
[31m-	docker-compose ps[m
[32m+[m	[32mdocker-compose -f docker-compose.yml up -d \[m
[32m+[m	[32m&& docker-compose ps[m
 [m
 down: ## Stops and removes the docker containers[m
 	docker-compose down[m
[36m@@ -35,5 +35,22 @@[m [mdown: ## Stops and removes the docker containers[m
 logs: ## Get logs from docker composer[m
 	docker-compose logs[m
 [m
[32m+[m[32mapi-client: # generate client from openapi[m
[32m+[m	[32mdocker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \[m
[32m+[m[32m    -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/2_0/petstore.yaml \[m
[32m+[m[32m    -g typescript-angular \[m
[32m+[m[32m    -o /local/generated/client[m
[32m+[m
[32m+[m[32mapi-server: # generate server from openapi[m
[32m+[m	[32mdocker run --rm \[m
[32m+[m	[32m-v "${PWD}:/local" \[m
[32m+[m	[32mopenapitools/openapi-generator-cli generate \[m
[32m+[m[32m    -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/2_0/petstore.yaml \[m
[32m+[m[32m    -g php-lumen \[m
[32m+[m[32m    -o /local/generated/server[m
[32m+[m
[32m+[m[32mapi-editor:[m
[32m+[m	[32mdocker run -d -p 8080:8080 swaggerapi/swagger-editor -v .:/tmp -e SWAGGER_FILE=/tmp/resum.openapi.yml[m
[32m+[m
 help:[m
 	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'[m
[1mdiff --git a/client/package-lock.json b/client/package-lock.json[m
[1mindex a0c94fe..6d7016b 100644[m
[1m--- a/client/package-lock.json[m
[1m+++ b/client/package-lock.json[m
[36m@@ -1968,6 +1968,14 @@[m
         "minimist": "^1.2.0"[m
       }[m
     },[m
[32m+[m[32m    "@ctrl/ngx-emoji-mart": {[m
[32m+[m[32m      "version": "4.0.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@ctrl/ngx-emoji-mart/-/ngx-emoji-mart-4.0.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-CbacuMN838El0NoScQbcr6IqDsOaW/8PCuPIhe71/M9hqcd2Mc7wigK06PIKPSl6JCYMKow4ZgPaga0OU0lfVQ==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "tslib": "^2.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "@ctrl/ngx-headroom": {[m
       "version": "3.0.0",[m
       "resolved": "https://registry.npmjs.org/@ctrl/ngx-headroom/-/ngx-headroom-3.0.0.tgz",[m
[36m@@ -2317,6 +2325,51 @@[m
         }[m
       }[m
     },[m
[32m+[m[32m    "@ng-web-apis/canvas": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@ng-web-apis/canvas/-/canvas-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-B9mXRQ8gCooHiMDQqnZd0uo1jHfaCnLo23gbip6bMGICyHdhPAuGyPBYooEOoOuArZxMCx4kb3K1A0heicr3+g==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "tslib": "^1.9.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": {[m
[32m+[m[32m          "version": "1.13.0",[m
[32m+[m[32m          "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.13.0.tgz",[m
[32m+[m[32m          "integrity": "sha512-i/6DQjL8Xf3be4K/E6Wgpekn5Qasl1usyw++dAA35Ue5orEn65VIxOA+YvNNl9HV3qv70T7CNwjODHZrLwvd1Q=="[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "@ng-web-apis/common": {[m
[32m+[m[32m      "version": "1.4.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@ng-web-apis/common/-/common-1.4.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-2K+oh8GNeVapMBQmJzRLyH90RmMyt36o7oOTA9GWSuYxME3ycNDboUlIMIKzpaDDHsoIJq2A446SLJopcmmPag==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "tslib": "^1.9.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": {[m
[32m+[m[32m          "version": "1.13.0",[m
[32m+[m[32m          "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.13.0.tgz",[m
[32m+[m[32m          "integrity": "sha512-i/6DQjL8Xf3be4K/E6Wgpekn5Qasl1usyw++dAA35Ue5orEn65VIxOA+YvNNl9HV3qv70T7CNwjODHZrLwvd1Q=="[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "@ng-web-apis/intersection-observer": {[m
[32m+[m[32m      "version": "2.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@ng-web-apis/intersection-observer/-/intersection-observer-2.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-2y2b2aMIUgLko6tlraIT9WHIJ2LU7i8+TokNfEI/U/iGvMVEgggeVdJ2aKGRjGIEntP55oD9j+RRwrZHSxocTg==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "tslib": "^1.9.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": {[m
[32m+[m[32m          "version": "1.13.0",[m
[32m+[m[32m          "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.13.0.tgz",[m
[32m+[m[32m          "integrity": "sha512-i/6DQjL8Xf3be4K/E6Wgpekn5Qasl1usyw++dAA35Ue5orEn65VIxOA+YvNNl9HV3qv70T7CNwjODHZrLwvd1Q=="[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "@ngrx/effects": {[m
       "version": "9.2.0",[m
       "resolved": "https://registry.npmjs.org/@ngrx/effects/-/effects-9.2.0.tgz",[m
[1mdiff --git a/client/package.json b/client/package.json[m
[1mindex 83b7c4c..4d73b11 100644[m
[1m--- a/client/package.json[m
[1m+++ b/client/package.json[m
[36m@@ -9,7 +9,8 @@[m
     "test": "jest",[m
     "lint": "ng lint",[m
     "e2e": "ng e2e",[m
[31m-    "test:watch": "jest --watch"[m
[32m+[m[32m    "test:watch": "jest --watch",[m
[32m+[m[32m    "postinstall": "ngcc"[m
   },[m
   "private": true,[m
   "dependencies": {[m
[36m@@ -23,7 +24,11 @@[m
     "@angular/router": "~10.0.3",[m
     "@briebug/jest-schematic": "^2.1.1",[m
     "@ckeditor/ckeditor5-angular": "^1.2.3",[m
[32m+[m[32m    "@ctrl/ngx-emoji-mart": "^4.0.2",[m
     "@ctrl/ngx-headroom": "^3.0.0",[m
[32m+[m[32m    "@ng-web-apis/canvas": "^1.0.0",[m
[32m+[m[32m    "@ng-web-apis/common": "^1.4.1",[m
[32m+[m[32m    "@ng-web-apis/intersection-observer": "^2.0.0",[m
     "@ngrx/effects": "^9.2.0",[m
     "@ngrx/router-store": "^9.2.0",[m
     "@ngrx/schematics": "^9.2.0",[m
[1mdiff --git a/client/src/app/shared/shared.module.ts b/client/src/app/shared/shared.module.ts[m
[1mindex 284f631..ec21ff1 100644[m
[1m--- a/client/src/app/shared/shared.module.ts[m
[1m+++ b/client/src/app/shared/shared.module.ts[m
[36m@@ -6,6 +6,7 @@[m [mimport { CardComponent } from './components/card/card.component';[m
 import { PageComponent } from './components/page/page.component';[m
 import { MenuComponent } from './containers/menu/menu.component';[m
 import { MenuItemComponent } from './components/menu-item/menu-item.component';[m
[32m+[m[32mimport { MediaComponent } from './components/media/media.component';[m
 [m
 @NgModule({[m
   declarations: [[m
[36m@@ -13,6 +14,7 @@[m [mimport { MenuItemComponent } from './components/menu-item/menu-item.component';[m
     PageComponent,[m
     MenuComponent,[m
     MenuItemComponent,[m
[32m+[m[32m    MediaComponent,[m
   ],[m
   imports: [CommonModule, RouterModule],[m
   exports: [[m
[1mdiff --git a/client/tsconfig.base.json b/client/tsconfig.base.json[m
[1mindex c5c9240..7a241d2 100644[m
[1m--- a/client/tsconfig.base.json[m
[1m+++ b/client/tsconfig.base.json[m
[36m@@ -22,6 +22,7 @@[m
   "angularCompilerOptions": {[m
     "entryModule": "./src/app/app.module#AppModule",[m
     "strictTemplates": true,[m
[32m+[m[32m    "fullTemplateTypeCheck": true,[m
     "strictInjectionParameters": true[m
   }[m
 }[m
[1mdiff --git a/docker-compose.yml b/docker-compose.yml[m
[1mindex 4cc69b5..60e60a6 100644[m
[1m--- a/docker-compose.yml[m
[1m+++ b/docker-compose.yml[m
[36m@@ -68,7 +68,7 @@[m [mservices:[m
       - matomo:/var/www/html[m
     environment:[m
       - MATOMO_DATABASE_HOST=database[m
[31m-      - VIRTUAL_HOST=[m
[32m+[m[32m      - VIRTUAL_HOST=tracker.resum[m
     env_file:[m
       - .env.dist[m
       - .env[m
[36m@@ -84,3 +84,11 @@[m [mservices:[m
     ports:[m
       - 8000:8080[m
 [m
[32m+[m[32m  swagger-editor:[m
[32m+[m[32m    image: swaggerapi/swagger-editor[m
[32m+[m[32m    ports:[m
[32m+[m[32m      - 8080:8080[m
[32m+[m[32m    volumes:[m
[32m+[m[32m      - .:/tmp[m
[32m+[m[32m    environment:[m[41m [m
[32m+[m[32m      SWAGGER_FILE: /tmp/resum.openapi.yml[m
