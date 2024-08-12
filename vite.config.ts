// vite.config.ts

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fcmSwEnvPlugin } from "./vitePlugin";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      envPrefix: "REACT_APP_",
      plugins: [react(), fcmSwEnvPlugin()],
      test: {
        environment: "jsdom",
        setupFiles: "./src/__tests__/setup.ts",
        globals: true,
      },
    };
  } else {
    return {
      envPrefix: "REACT_APP_",
      plugins: [react()],
      build: {
        target: "es2022",
        rollupOptions: {
          input: {
            main: "./index.html",
            "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
          },
          output: {
            entryFileNames: (chunkInfo) => {
              return chunkInfo.name === "firebase-messaging-sw"
                ? "[name].js"
                : "assets/[name]-[hash].js";
            },
          },
        },
      },
      test: {
        environment: "jsdom",
        setupFiles: "./src/__tests__/setup.ts",
        globals: true,
      },
    };
  }
});
