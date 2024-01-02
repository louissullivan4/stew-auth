module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.m?js$': 'babel-jest',
    },
    testMatch: ["**/test/**/*.js", "**/?(*.)+(spec|test).js"]
  };