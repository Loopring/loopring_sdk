module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': './node_modules/babel-jest',
  }
}
