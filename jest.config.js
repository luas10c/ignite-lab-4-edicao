/**@type{import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  moduleNameMapper: {
    '/^#/(.*)$/': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['src/**/*.(j|t)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node'
}
