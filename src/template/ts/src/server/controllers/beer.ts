import express, { Request, Response, Router } from "express";
import Beer from "../models/Beer";

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

    this.router.patch("/beer/:id", async (req: Request, res: Response) => {
      try {
        const beer = await Beer.findById(req.params.id);

        if (!beer) {
          return res.status(404).send();
        }

        const updates = Object.keys(req.body);
        updates.forEach((update) => (beer[update] = req.body[update]));

        await beer.save();

        res.send(beer);
      } catch (error) {
        res.status(500).send({ error });
      }
    });
  }
}

export default BeerController;
