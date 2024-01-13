# Stew Authentication Microservice

## Overview 
You can both manually and automatically test the application. See below for more information.

### Automatic Testing with Docker
#### Step 1: Pull the Docker Image

```bash
docker pull ghcr.io/louissullivan4/stewauth:1.2.0
```

#### Step 2: Set Up Environment Variables in Testing Mode
Create a .env.test file in the current directory and include the following variables:

JWT_SECRET: A randomly generated JWT secret.
PORT: The port number on which the service will run (default is 3005).
MONGO_URI: TO YOUR TESTING DATABASE. THIS IS IMPORTANT AS IT WILL CLEAR YOUR DATABASE ON RUNNING.
CLEAR_DB: Set to true to delete the database on startup. CAUTION!!!
DISABLE_RATE_LIMIT: Set to true to avoid rate limiting errors. CAUTION!!!
NODE_ENV: set to test to run npm test

##### Example '.env'
```bash
JWT_SECRET=your_random_secret
PORT=3005
MONGO_URI=mongodb://localhost:27017/TESTDBNAME
CLEAR_DB=true
DISABLE_RATE_LIMIT=true
NODE_ENV=test
```

#### Step 3: Run the Docker Image
Run the Docker image with the following command, passing the .env file:

```bash
docker run --env-file .env.test -p 3005:3005 ghcr.io/louissullivan4/stewauth:1.2.0
```

### Manual Testing with server running
#### 1. Creating a New User
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```

#### 2. Creating a New User with Invalid credentials (i.e. password must be at least 8 chars, at least 1 capital letter, at least 1 symbol and at least 1 number)
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "abc"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"abc\"}"
```


#### 3. Attempting to Create a User That Already Exists
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```


#### 4. Logging in as a User That Doesn't Exist
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "nonexistentuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"nonexistentuser@gmail.com\", \"password\": \"Password123!\"}"
```


#### 5. Logging in a User That Exists with the Correct Password
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```

#### 6. Logging in the User with the Wrong Password
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Wrongpassword123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Wrongpassword123!\"}"
```
