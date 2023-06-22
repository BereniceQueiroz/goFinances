module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios"
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx" //ignore todas as pastas que terminem com spec.tsx
  ],
  coverageReporters: [
    'lcov', //tipo de relatorio
  ]
}
