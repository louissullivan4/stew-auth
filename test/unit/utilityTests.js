const bcryptHelper = require('../../src/utils/bcryptHelper');

describe('Bcrypt Helper', () => {
  it('should hash a password', async () => {
    const password = 'password123';
    const hashed = await bcryptHelper.hashPassword(password);

    expect(typeof hashed).toBe('string');
    expect(hashed).not.toBe(password);
  });
});