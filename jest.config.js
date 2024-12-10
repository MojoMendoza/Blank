module.exports = {
    testEnvironment: 'jsdom', // Ensure we are using jsdom for DOM-based tests
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transpile using babel-jest
    },
    moduleNameMapper: {
      '^react-router-dom$': require.resolve('react-router-dom'), // Correct module mapping
    },
  };
  