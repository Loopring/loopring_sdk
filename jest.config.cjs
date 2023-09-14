module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': './node_modules/babel-jest',
  },
  "moduleNameMapper": {
    "axios": "axios/dist/node/axios.cjs"
  },
  "transformIgnorePatterns": ["node_modules\/(?!axios)"]
}
