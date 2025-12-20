import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: true, // ✅ MUST be true
      },
    ],
  },

  moduleNameMapper: {
    // 🔥 THIS IS THE KEY LINE
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,
};

export default config;
