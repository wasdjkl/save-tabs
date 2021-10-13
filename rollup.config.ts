import { defineConfig } from "rollup";
import rollupPluginNodeResolve from "@rollup/plugin-node-resolve";
import rollupPluginTypescript from "@rollup/plugin-typescript";
import rollupPluginReplace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";

export default defineConfig({
  input: "src/background/index.ts",
  output: {
    file: "dist/debug/chrome/background/index.js",
    format: "esm",
  },
  plugins: [
    rollupPluginNodeResolve(),
    rollupPluginTypescript({
      tsconfig: "src/tsconfig.json",
    }),
    copy({
      targets: [{ src: "public/*", dest: "dist/debug/chrome" }],
    }),
    rollupPluginReplace({
      preventAssignment: true,
    }),
  ],
});
