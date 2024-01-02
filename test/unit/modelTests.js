const User = require('../../src/models/User');
const clearDatabase = require('../../src/utils/clearDatabase');

describe('User Model', () => {
  it('should create a new user', () => {
    const user = new User({
      username: 'testUser',
      password: 'password123',
    });

    expect(user.username).toBe('testUser');
    expect(user.password).toBe('password123');
  });
  afterAll(async () => {
    await clearDatabase();
  });
});