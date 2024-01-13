    const request = require('supertest');
    const createApp = require('../../src/server');
    const clearDatabase = require('../../src/utils/clearDatabase');
    const disconnectDatabase = require('../../src/utils/disconnectDatabase');

    describe('API Endpoints', () => {
    let app;

    beforeAll(async () => {
        app = await createApp();
    });

    // Sign Up Endpoint Tests
    it('Should create a new user', async () => {
        await request(app)
            .post('/auth/signup')
            .send({ username: 'testuser0@test.com', password: '!Testpassword1' })
            .expect(201);
    });

    it('Should not create a new user because they already exist', async () => {
        await request(app)
            .post('/auth/signup')
            .send({ username: 'testuser0@test.com', password: '!Testpassword1' })
            .expect(400);
    });

    it('Should not create a new user because the username is not formatted as a valid email', async () => {
        await request(app)
        .post('/auth/signup')
            .send({ username: 'invalidemail', password: '!Testpassword1' })
            .expect(400);
    });

    it('Should not create a new user because the password that has less than 8 characters', async () => {
        await request(app)
        .post('/auth/signup')
            .send({ username: 'testuser1@test.com', password: '!Testp1' })
            .expect(400);
    });

    it('Should not create a new user because the password that has no numbers', async () => {
        await request(app)
        .post('/auth/signup')
            .send({ username: 'testuser2@test.com', password: '!Testpassword' })
            .expect(400);
    });

    it('Should not create a new user because the password that has no uppercase characters', async () => {
        await request(app)
        .post('/auth/signup')
            .send({ username: 'testuser3@test.com', password: '!testpassword1' })
            .expect(400);
    });

    it('Should not create a new user because the password that has no special characters', async () => {
        await request(app)
        .post('/auth/signup')
            .send({ username: 'testuser4@test.com', password: 'Testpassword1' })
            .expect(400);
    });

    // Login Endpoint Tests
    it('Should login a user', async () => {
        await request(app)
            .post('/auth/login')
            .send({ username: 'testuser0@test.com', password: '!Testpassword1' })
            .expect(200);
    });

    it('Should not login a user with an empty username', async () => {
        await request(app)
            .post('/auth/login')
            .send({ username: '', password: '!Testpassword1' })
            .expect(400);
    });

    it('Should not login a user with an empty password', async () => {
        await request(app)
            .post('/auth/login')
            .send({ username: 'testuser0@test.com', password: '' })
            .expect(400);
    });

    it('Should not login a user who does not exist in the database', async () => {
        await request(app)
            .post('/auth/login')
            .send({ username: 'doesnotexist@test.com', password: '!Testpassword1' })
            .expect(400);
    });

    it('Should not login a user who does not exist in the database', async () => {
        await request(app)
            .post('/auth/login')
            .send({ username: 'doesnotexist@test.com', password: '!Testpassword1' })
            .expect(400);
    });

    // Other Endpoint Tests
    it('Should return 404 for unknown endpoints', async () => {
        await request(app)
            .get('/noendpoint')
            .expect(404);
    });

    afterAll(async () => {
        await clearDatabase();
        await disconnectDatabase();
    });
});
