module.exports = {
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json'
      }
    },
    coveragePathIgnorePatterns: [
      "/node_modules"
    ],
    preset: "ts-jest",
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    modulePaths: ["<rootDir>/src/"],
    testMatch: ["<rootDir>/spec/*.test.ts?(x)"],
    setupFilesAfterEnv: ["<rootDir>/spec/setup.ts"],
    testEnvironment: 'node'
}