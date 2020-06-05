import chalk from "chalk";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";

class App {
  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  initializeMiddlewares() {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    this.app.use(express.json());
    this.app.use(morgan("dev"));
    const whitelistDomains = [
      "http://localhost:3000",
      "http://localhost:8080",
      undefined,
    ];

    const corsOptions = {
      origin: (origin, cb) => {
        if (whitelistDomains.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          // eslint-disable-next-line no-console
          console.error(`Sever refused to allow: ${origin}`);
          cb(new Error("Not allowed by CORS"));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    this.app.use(express.static(path.join(__dirname, "../dist")));

    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Mode: ${chalk.blueBright(process.env.NODE_ENV)}\n`);
      // eslint-disable-next-line no-console
      console.log(
        `Server is listening on port: ${chalk.blueBright(this.port)}\n`
      );
    });
  }
}

export default App;
