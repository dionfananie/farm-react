const path = require("path");
const fsp = require("fs/promises");
const fastify = require("fastify");
const fastifyStatic = require("@fastify/static");

function resolve(p) {
  return path.resolve(__dirname, p);
}

async function createServer() {
  const app = fastify({
    logger: true,
  });

  // Register static file handling after the main route
  await app.register(fastifyStatic, {
    root: path.join(__dirname, "build"),
    prefix: "/static/", // Changed to /static/ prefix to avoid conflicts
    decorateReply: false, // Prevents conflicts with other plugins
  });

  // Catch-all route for other paths that should render the app
  app.get("/*", async (request, reply) => {
    try {
      let template = await fsp.readFile(
        resolve("build/index_client.html"),
        "utf8"
      );
      const serverEntry = resolve("dist/index.js");
      const render = require(serverEntry);

      const renderedHtml = render(request.url);
      console.log(renderedHtml);

      let html = template.replace("{app-html-to-replace}", renderedHtml);
      console.log(template.includes("{app-html-to-replace}"));
      console.log(html.includes("{app-html-to-replace}"));

      return reply.type("text/html").code(200).send(html);
    } catch (error) {
      console.log(error.stack);
      return reply.code(500).send(error.stack);
    }
  });

  return app;
}

createServer().then((app) => {
  const port = process.env.FARM_DEFAULT_SERVER_PORT || 3001;
  app.listen({ port: port }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log("HTTP server is running at http://localhost:" + port);
  });
});
