import { defineConfig } from "@farmfe/core";
import path from "path";
/**
 * @type {import('@farmfe/core').UserConfig}
 */
export default defineConfig({
  plugins: ["@farmfe/plugin-react"],
  compilation: {
    input: {
      index_client: "./index.html"
    },
    output: {
      path: "./build"
    },
    // sourcemap: true,
    css: {
      // modules: {
      //   indentName: 'farm-[name]-[hash]'
      // },
      prefixer: {
        targets: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"]
      }
    }
    // treeShaking: true,
    // minify: true,
  },
  server: {
    hmr: true,
    cors: true,
    middlewares: [
      (server) => {
        server.app().use(async (ctx, next) => {
          await next();
          if (ctx.path === "/" || ctx.status === 404) {
            // console.log('ctx.path', ctx.path);
            const template = server
              .getCompiler()
              .resource("index_client.html")
              .toString();
            const moudlePath = path.join(
              path.dirname(import.meta.url),
              "dist",
              "index.js"
            );
            const render = await import(moudlePath).then((m) => m["default"]);
            const renderedHtml = render(ctx.path);
            // console.log(renderedHtml);
            const html = template.replace(
              "{app-html-to-replace}",
              renderedHtml
            );
            ctx.body = html;
            ctx.type = "text/html";
            ctx.status = 200;
          }

          console.log("ctx.path outer", ctx.path);
        });
      }
    ]
  }
});
