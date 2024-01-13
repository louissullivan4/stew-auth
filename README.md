# Stew Authentication Microservice

A microservice to be used as an authentication service for my future applications. The repo also contains a middleware folder containing a function for verifying the JWT token. This can be implemented in every future microservice allowing it to independently verify the JWT signature to ensure it's valid and hasn't been tampered with and reducing single points of failure by having it centralised in this microservice. 

## Running Docker Deployment
1. Pull the docker image
```
docker pull ghcr.io/louissullivan4/stewauth:1.1.0
```
2. Create a .env file with the values from environment variables setup
3. Run the docker image and pass the .env file to it variable setup below
```
docker run --env-file .env.dev -p 3005:3005 louissullivan4/stewauth:1.1.0
```

## Environment Variables Setup
Create a .env file in current directory and add the following:
* JWT_SECRET= {randomly generate a JWS secret}
* PORT= {default 3005}
* MONGO_URI= {mongodb://localhost:27017/DbName or a link to your mongodb hosted elsewhere}
* CLEAR_DB={deletes database on startup if set to true}
* DISABLE_RATE_LIMIT={disables rate limiting for login and signup mainly used for testing}


Note that the application will fail if you try to run with a localhost db if your docker container is not running
a mongodb instance. Consider a docker-compose or database hosted on the internet.
