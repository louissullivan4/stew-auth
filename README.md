# Stew Authentication Microservice

## Overview

The Stew Authentication Microservice is a robust, secure, and scalable solution designed to handle authentication for various applications. It employs modern security practices, including JWT (JSON Web Tokens) for maintaining session state and bcrypt for password hashing, ensuring secure and efficient authentication. This service is designed to be a starting point for secure authentication and can be extended and customized based on specific application requirements. 

- See this [documentation](/docs/features.md) for more information about the features provided by the microservice.
- See this [documentation](/docs/testing.md) for more information about the testing provided by the microservice.

## Docker Deployment Guide

### Version 1.2.0

Please update the instructions as necessary for the latest version.
### Running with mongodb already setup
#### Step 1: Pull the Docker Image

```bash
docker pull ghcr.io/louissullivan4/stewauth:1.2.0
```

#### Step 2: Set Up Environment Variables
Create a .env file in the current directory and include the following variables:

JWT_SECRET: A randomly generated JWT secret.
PORT: The port number on which the service will run (default is 3005).
MONGO_URI: The MongoDB URI. This can be a local MongoDB instance (mongodb://localhost:27017/DbName) or a remote database.
CLEAR_DB: Set to true to delete the database on startup. CAUTION!
DISABLE_RATE_LIMIT: Disables rate limiting, mainly used for testing purposes.

##### Example '.env'
```bash
JWT_SECRET=your_random_secret
PORT=3005
MONGO_URI=mongodb://localhost:27017/YourDbName
CLEAR_DB=false
DISABLE_RATE_LIMIT=false
```

#### Step 3: Run the Docker Image
Run the Docker image with the following command, passing the .env file:

```bash
docker run --env-file .env -p 3005:3005 ghcr.io/louissullivan4/stewauth:1.2.0
```

Note: If using a local database, ensure that your Docker container has access to the MongoDB instance. Consider using Docker Compose for easier setup, or opt for a cloud-hosted database.

### Setup mongodb container and run containers together
#### Step 1: Pull the Docker Images
```bash
docker pull ghcr.io/louissullivan4/stewauth:1.2.0
```
```bash
docker pull mongo:4.4
```

#### Step 2: Create docker network for containers to communicate
```bash
docker network create stew-auth_default
```

#### Step 3: Run mongodb container
```bash
docker run --name mongodb --network stew-auth_default -d mongo:4.4
```

#### Step 4: Create a new user to access the database
```bash
docker exec -it mongodb mongo
```
```javascript
use myDatabaseName
```
```javascript
db.createUser({user: 'setUserName',pwd: 'setUserPassword',roles: [{ role: 'readWrite', db: 'myDatabaseName' }]})
```

#### Step 5: Verify that user was created
```javascript
db.auth('setUserName', 'setUserPassword')
```

#### Step 6: Create a .env (see above) and set the MONGO_URI
```bash
MONGO_URI=mongodb://setUserName:setUserPassword@mongodb:27017/myDatabaseName
```

#### Step 7: Create a .env (see above) and set the MONGO_URI
```bash
MONGO_URI=mongodb://setUserName:setUserPassword@mongodb:27017/myDatabaseName
```

#### Step 8: Run stew auth container with .env set to your new file and your network set to stew-auth_default
```bash
docker run --env-file .env --network stew-auth_default -p 3005:3005 ghcr.io/louissullivan4/stewauth:1.2.0
```

#### Step 9: Run a manual curl to create user and to see if all is set correctly
```bash
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

