import { defineConfig } from "@farmfe/core";
import { builtinModules } from "node:module";

export default defineConfig({
  plugins: ["@farmfe/plugin-react"],
  compilation: {
    input: {
      index: "./src/index-server.tsx"
    },
    output: {
      path: "./dist",
      targetEnv: "node",
      format: "cjs",
      publicPath: "/"
    },
    external: [...builtinModules.map((m) => `^${m}$`)],
    css: {
      prefixer: {
        targets: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"]
      }
    },
    assets: {
      mode: "browser"
    }
  }
});
