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
  console.log("path:", path.join(__dirname, "build"));

  // Register static file handling
  await app.register(fastifyStatic, {
    root: path.join(__dirname, "build"),
    prefix: "/", // serve all static files at root path
  });
  // Main route handler
  app.get("/", async (request, reply) => {
    let url = request.url;

    try {
      let template = await fsp.readFile(
        resolve("build/index_client.html"),
        "utf8"
      );
      const serverEntry = resolve("dist/index.js");
      const render = require(serverEntry);

      const renderedHtml = render(url);
      console.log(renderedHtml);

      let html = template.replace("{app-html-to-replace}", renderedHtml);
      console.log(template.includes("{app-html-to-replace}"));
      console.log(html.includes("{app-html-to-replace}"));

      reply.type("text/html").code(200).send(html);
    } catch (error) {
      console.log(error.stack);
      reply.code(500).send(error.stack);
    }
  });

  return app;
}

createServer().then((app) => {
  const port = process.env.FARM_DEFAULT_SERVER_PORT || 3000;
  app.listen({ port, host: "0.0.0.0" }, (err) => {
    console.log("port: ", port);

    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log("HTTP server is running at http://localhost:" + port);
  });
});
