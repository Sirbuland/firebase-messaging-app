// https://medium.com/@daeram.chung/fcm-service-worker-vite-8deccfc23fe2

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function fcmSwEnvPlugin() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  console.log(__dirname);
  const fcmSwCode = fs.readFileSync(
    `${__dirname}/src/firebase-messaging-sw.js`,
    "utf8"
  );

  const transformedCode = fcmSwCode.replace(
    new RegExp(`import.meta.env.(\\w+)`, "g"),
    (_, varName) => `"${process.env[varName]}"`
  );
  const finalCode =
    "// IMPORTANT: This file only exists for dev mode purposes. Do not modify this file. Any changes should be made in `src/firebase-messaging-sw.js`.\n\n" +
    transformedCode;

  const outputPath = path.resolve("public", "./firebase-messaging-sw.js");
  fs.writeFileSync(outputPath, finalCode);

  return {
    name: "rollup-plugin-fcm-sw-env",
  };
}
