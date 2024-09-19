/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "Yss",
      formats: ["es", "system"],
      fileName: "yss",
    },
  },
  plugins: [wasm(), topLevelAwait()],
  worker: {
    plugins: () => [wasm(), topLevelAwait()],
  },
  test: {
    setupFiles: ["@vitest/web-worker"],
  },
});
