# Manual Tests for Authentication Microservice
### 1. Creating a New User
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```

### 2. Creating a New User with Invalid credentials (i.e. password must be at least 8 chars, at least 1 capital letter, at least 1 symbol and at least 1 number)
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "abc"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"abc\"}"
```


### 3. Attempting to Create a User That Already Exists
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```


### 4. Logging in as a User That Doesn't Exist
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "nonexistentuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"nonexistentuser@gmail.com\", \"password\": \"Password123!\"}"
```


### 5. Logging in a User That Exists with the Correct Password
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Password123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Password123!\"}"
```

### 6. Logging in the User with the Wrong Password
* Linux/Mac:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d '{"username": "newuser@gmail.com", "password": "Wrongpassword123!"}'
```

* Windows:
```
curl -X POST http://localhost:3005/auth/login -H "Content-Type: application/json" -d "{\"username\": \"newuser@gmail.com\", \"password\": \"Wrongpassword123!\"}"
```
