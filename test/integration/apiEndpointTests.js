const request = require('supertest');
const createApp = require('../../src/server');

describe('API Endpoints', () => {
  it('should create a new user', (done) => {
    const app = createApp(true); 

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
    const app = createApp(true); 

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
    const app = createApp(true); 

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
    const app = createApp(true); 

    request(app)
      .get('/unknown')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

});