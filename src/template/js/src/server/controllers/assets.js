import express from "express";
import path from "path";

class AssetsController {
  router = express.Router();

  static assetList = [];

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    AssetsController.assetList.forEach((asset) => {
      this.router.get(`/assets/${asset}`, async (req, res) => {
        res.sendFile(path.join(__dirname, `../assets/${asset}`));
      });
    });
  }
}

export default AssetsController;
