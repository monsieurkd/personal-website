import { defineConfig } from "vitest/config";

// Test runner config. `environment: node` is enough for data/logic tests
// (no DOM needed). When you start testing React components, switch this to
// "jsdom" and install jsdom + @testing-library/react.
export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.{js,jsx}"],
  },
});
