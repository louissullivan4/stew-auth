# Stew Authentication Microservice

A microservice to be used as an authentication service for my future applications

## Manual Tests for Authentication Microservice
1. Creating a New User
Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'
```

Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser\", \"password\": \"password123\"}"
```


2. Attempting to Create a User That Already Exists
Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'
```

Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser\", \"password\": \"password123\"}"

```


3. Logging in as a User That Doesn't Exist
Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "nonexistentuser", "password": "password123"}'
```

Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"nonexistentuser\", \"password\": \"password123\"}"
```


4. Logging in a User That Exists with the Correct Password
Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'
```

Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser\", \"password\": \"password123\"}"

```

5. Logging in the User with the Wrong Password
Linux/Mac:
```
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username": "newuser", "password": "wrongpassword"}'
```

Windows:
```
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser\", \"password\": \"wrongpassword\"}"
```