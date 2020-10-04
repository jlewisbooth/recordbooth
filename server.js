/* require */
const express = require("express");
const processCtl = require("process");
const bodyParser = require("body-parser");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 8080;

/* make next app */
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

/* router */
const handle = nextApp.getRequestHandler();

class Server {
  constructor() {
    this.server = express();

    let staticRef = new RegExp(/.(svg|png|jpeg|jpg|json|css|gltf)/);

    this.server.use((req, res, next) => {
      if (staticRef.test(req.url)) {
        res.setHeader(
          "Cache-Control",
          "max-age=604800, stale-while-revalidate=2419200"
        );
      }
      next();
    });

    /* Module for parsing JSON and other data types to and from Client */
    this.server.use(bodyParser.json());
    this.server.use(express.static("static"));

    this.server.get("/*", (req, res) => {
      return handle(req, res);
    });

    // boilerplate code to handle graceful exiting of server
    processCtl.on("SIGTERM", () => this._shutdown("SIGTERM"));
    processCtl.on("SIGINT", () => this._shutdown("SIGINT"));
    processCtl.on("uncaughtException", (error) => {
      console.log(error);
      this._shutdown("uncaughtException");
    });
    processCtl.chdir(__dirname);

    this.port = port;
  }

  _handleStreamSocket(ws, next) {}

  _handleWebSocket(ws, next) {}

  run() {
    let serverInst = this.server.listen(this.port, "0.0.0.0", () => {
      console.log(`Webapp started. Open on http://localhost:${this.port}/`);
    });
    serverInst.on("error", (error) => console.log(`Server error: ${error}`));
  }

  _shutdown(signal) {
    console.log(`${signal} received; Shutting down.`);
    setTimeout(() => process.exit(), 100);
  }
}

nextApp
  .prepare()
  .then(() => {
    const webApp = new Server();

    if (require.main === module) {
      webApp.run();
    } else {
      module.exports = app;
    }
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// unhandled rejections swallow error messages, this regurgitates them
processCtl.on("unhandledRejection", (error) => {
  console.log("unhandledRejection:", error.message);
  console.log(error.stack);
});
