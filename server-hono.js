import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { resolve } from "path";
import { readFile } from "fs/promises";

const __dirname = import.meta.dir; // Bun-specific way to get directory name

function resolvePath(p) {
  return resolve(__dirname, p);
}

async function createServer() {
  const app = new Hono();

  // Serve static files from build directory
  app.use("/*", serveStatic({ root: resolvePath("build") }));

  // Main route handler
  app.get("*", async (c) => {
    const url = c.req.url;

    try {
      // Read template file
      const template = await readFile(
        resolvePath("build/index_client.html"),
        "utf8"
      );

      // Import server entry point
      const serverEntry = resolvePath("dist/index.js");
      const { default: render } = await import(serverEntry);

      // Render the application
      const renderedHtml = render(url);
      console.log(renderedHtml);

      // Replace placeholder with rendered HTML
      const html = template.replace("{app-html-to-replace}", renderedHtml);
      console.log(template.includes("{app-html-to-replace}"));
      console.log(html.includes("{app-html-to-replace}"));

      // Return the complete HTML
      return new Response(html, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    } catch (error) {
      console.error(error.stack);
      return new Response(error.stack, {
        status: 500
      });
    }
  });

  return app;
}

// Start the server
const port = parseInt(process.env.FARM_DEFAULT_SERVER_PORT || "3002");
const app = await createServer();

export default {
  port,
  fetch: app.fetch
};
