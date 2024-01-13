# Stew Authentication Microservice

## Features

#### 1. **User Authentication and Management**
   - **Sign Up and Login:** Provides endpoints for user registration (`/signup`) and login (`/login`). During sign-up, it checks for unique usernames and hashes passwords using bcrypt before storing them.
   - **JWT Token Generation:** On successful login, the service issues a JWT token, which can be used for maintaining session state and securing further API requests.
   - **Input Validation and Sanitization:** Input validation and sanitization are performed using `express-validator` and custom sanitizers to ensure that the data is secure and formatted correctly.

#### 2. **Security and Error Handling**
   - **Error Handling:** Custom error classes (`AuthenticationError`, `ValidationError`, `RateLimitError`) are used to handle different types of errors elegantly and to provide meaningful error messages to the client.
   - **Rate Limiting:** Rate limiting is implemented for both sign-up and login routes to prevent brute force attacks.
   - **Secure Password Handling:** Passwords are securely hashed using bcrypt, ensuring that plaintext passwords are never stored or transmitted.

#### 3. **Middleware for JWT Verification**
   - **Token Verification:** A middleware function (`authenticateToken`) is included to verify JWT tokens. It's used to secure other endpoints in your microservices, ensuring that only valid and unaltered tokens are accepted.

#### 4. **Database Integration and Management**
   - **MongoDB Integration:** Utilizes MongoDB for storing user credentials. The connection is managed efficiently, with provisions for clearing the database on startup if required.
   - **Schema Definition:** User data schema is defined using Mongoose, ensuring data integrity.

#### 5. **Logging and Monitoring**
   - **Logging:** Winston is used for logging, providing an efficient way to track and record application behavior and errors, aiding in monitoring and debugging.

#### 6. **Testing**
   - **Endpoint Testing:** Includes tests for endpoints using `supertest` to ensure that the API behaves as expected. Tests cover scenarios like successful user creation, login, and various input validation cases.

#### 7. **Containerization and Configuration**
   - **Docker Support:** The microservice is containerized using Docker, simplifying deployment and environment consistency.
   - **Environment Variable Management:** Uses `.env` files for managing environment variables, allowing for flexible configuration.

#### 8. **Code Structure and Quality**
   - **Modular Code:** The code is structured modularly, making it easy to understand, maintain, and expand.
   - **Best Practices:** Adheres to best practices in Node.js and Express.js development, ensuring a high-quality, maintainable codebase.

### Integration and Usage

To integrate and use this microservice in your applications:
1. **Deploy the service** using Docker, setting the required environment variables.
2. **Utilize the `/signup` and `/login` endpoints** for user management.
3. **Implement the JWT middleware** in other microservices for secure access.
4. **Adjust the rate limiting and other configurations** as per your application's needs.
