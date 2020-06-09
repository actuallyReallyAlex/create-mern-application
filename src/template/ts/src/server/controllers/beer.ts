import express, { Request, Response, Router } from "express";
import Beer from "../models/Beer";
import { BeerDocument, BeerEditRequest } from "../types";

class BeerController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get("/beers", async (req: Request, res: Response) => {
      try {
        const beers = await Beer.find();

        res.send(beers);
      } catch (error) {
        res.status(500).send({ error });
      }
    });

    this.router.post("/beer", async (req: Request, res: Response) => {
      try {
        const newBeer = new Beer({
          abv: req.body.abv,
          brewer: req.body.brewer,
          description: req.body.description,
          name: req.body.name,
          type: req.body.type,
        });

        await newBeer.save();

        res.status(201).send(newBeer);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    this.router.put(
      "/beer/:id",
      async (req: BeerEditRequest, res: Response) => {
        try {
          const beer = (await Beer.findById(req.params.id)) as BeerDocument;

          if (!beer) {
            return res.status(404).send();
          }

          beer.abv = req.body.abv;
          beer.brewer = req.body.brewer;
          beer.description = req.body.description;
          beer.name = req.body.name;
          beer.type = req.body.type;

          await beer.save();

          res.send(beer);
        } catch (error) {
          res.status(500).send({ error });
        }
      }
    );

    this.router.delete("/beer/:id", async (req: Request, res: Response) => {
      try {
        const beer = await Beer.findOneAndDelete({ _id: req.params.id });

        if (!beer) {
          return res.status(404).send();
        }

        res.send(beer);
      } catch (error) {
        res.status(500).send({ error });
      }
    });
  }
}

export default BeerController;
