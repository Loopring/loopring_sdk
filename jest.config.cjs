module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  "moduleNameMapper": {
    "axios": "axios/dist/node/axios.cjs"
  },
  "transformIgnorePatterns": ["node_modules\/(?!axios)"]
}
