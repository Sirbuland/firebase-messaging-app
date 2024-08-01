/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    globals: true,
  },
});
