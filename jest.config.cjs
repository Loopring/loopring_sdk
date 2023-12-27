module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper:{
    '^(\\.{1,2}/.*/llhttp\\.wasm\\.js)$': '$1',
    axios: require.resolve("axios"),
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "wasm"
  ],
  "transformIgnorePatterns": ["node_modules\/(?!axios)"],
  setupFilesAfterEnv: ["./src/tests/test.setup.ts"],
}
