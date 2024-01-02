const request = require('supertest');
const createApp = require('../../src/server');
const clearDatabase = require('../../src/utils/clearDatabase');

const app = createApp(true); 
describe('API Endpoints', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'password123' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should not create a new user because they already exist', (done) => {
    request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'password123' })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should not create a new user because they already exist', (done) => {
    request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'password123' })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  
  it ('should return 404 for unknown endpoints', (done) => {
    request(app)
      .get('/unknown')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  afterAll(async () => {
    await clearDatabase();
  });
});