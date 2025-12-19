import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],

  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: false, // 🔥 IMPORTANT
      },
    ],
  },

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,
};

export default config;
