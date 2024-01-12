# Stew Authentication Microservice

A microservice to be used as an authentication service for my future applications. The repo also contains a middleware folder containing a function for verifying the JWT token. This can be implemented in every future microservice allowing it to independently verify the JWT signature to ensure it's valid and hasn't been tampered with and reducing single points of failure by having it centralised in this microservice. 

## Environment Variables Setup
Local:
Create a .env file in root directory and add the following:
* JWT_SECRET= {randomly generate a JWS secret}
* PORT= {a port to access the service from(default 3005)}
* MONGO_URI= {your mongodb database link}

To randomly generate a JWS secret:
* Linux/Mac
```
openssl rand -hex 64
```

* Windows Powershell
```
$bytes = New-Object Byte[] 64; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

## Manual Tests for Authentication Microservice
### 1. Creating a New User
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```


### 2. Attempting to Create a User That Already Exists
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```


### 3. Logging in as a User That Doesn't Exist
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "nonexistentuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"nonexistentuser@gmail.com\", \"password\": \"Password123!\"}"
```


### 4. Logging in a User That Exists with the Correct Password
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```

### 5. Logging in the User with the Wrong Password
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Wrongpassword123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Wrongpassword123!\"}"
```
