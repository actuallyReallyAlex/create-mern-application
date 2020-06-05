import chalk from "chalk";
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";

import { Controller } from "./types";

class App {
  public app: express.Application;

  public port: string;

  constructor(controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
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
      origin: (origin: string, cb: Function): void => {
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

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    this.app.use(express.static(path.join(__dirname, "../dist")));

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }

  public listen(): void {
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
