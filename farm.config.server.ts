import { defineConfig } from "@farmfe/core";
import { builtinModules } from "node:module";
export default defineConfig({
  compilation: {
    input: {
      index: "./src/index-server.tsx",
    },
    output: {
      path: "./dist",
      targetEnv: "node",
      format: "cjs",
      publicPath: "/static/",
      assetsFilename: "static/[resourceName].[hash].[ext]",
    },
    external: [...builtinModules.map((m) => `^${m}$`)],
    css: {
      prefixer: {
        targets: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"],
      },
    },
    assets: {
      mode: "browser",
    },
  },
  server: {
    port: 9001,
  },
  plugins: [
    [
      "@farmfe/plugin-react",
      {
        refresh: false,
        development: false,
      },
    ],
    "@farmfe/plugin-sass",
  ],
});
