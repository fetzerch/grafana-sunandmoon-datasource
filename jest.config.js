const coverageReporters = ["html", "text"];
const reporters = ["default"];
if (process.env.CI) {
  coverageReporters.push("lcov");
  reporters.push(["jest-junit", {output: "./junit-jest.xml"}]);
}

module.exports = {
  verbose: true,
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      isolatedModules: true
    },
  },
  moduleNameMapper: {
    "app/plugins/sdk": "<rootDir>/node_modules/grafana-sdk-mocks/app/plugins/sdk.ts"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!grafana-sdk-mocks)"
  ],
  transform: {
    "\\.ts$": "ts-jest"
  },
  testRegex: "(\\.|/)(jest)\\.ts$",
  moduleFileExtensions: ["js", "json", "ts"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: coverageReporters,
  reporters: reporters
};
