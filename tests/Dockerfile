
### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:12-alpine as builder


COPY package.json package-lock.json ./


## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /tests-app && mv ./node_modules ./tests-app/



### STAGE 2: Setup ###

FROM node:16-alpine

## Move to /tests-app (eq: cd /tests-app)
WORKDIR /tests-app


# Copy everything from host to /tests-app in the container
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
ARG NG_ENV=production

ARG TEST_BASE_URL=http://resum_client/

EXPOSE 8080

CMD ["npm", "start"]
