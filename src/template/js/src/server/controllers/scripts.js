import express from "express";
import path from "path";

class ScriptsController {
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/scripts/react.js", async (req, res) => {
      let filePath = "../../node_modules/react/umd/react.development.js";
      if (process.env.NODE_ENV === "production") {
        filePath = "../../node_modules/react/umd/react.production.min.js";
      }
      res.sendFile(path.join(__dirname, filePath));
    });

    this.router.get("/scripts/react-dom.js", async (req, res) => {
      let filePath =
        "../../node_modules/react-dom/umd/react-dom.development.js";
      if (process.env.NODE_ENV === "production") {
        filePath =
          "../../node_modules/react-dom/umd/react-dom.production.min.js";
      }
      res.sendFile(path.join(__dirname, filePath));
    });
  }
}

export default ScriptsController;
