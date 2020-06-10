import { Request, Router } from "express";
import { Document } from "mongoose";

export interface BeerDocument extends Document {
  _id: string;
  abv: number;
  brewer: string;
  description: string;
  name: string;
  type: string;
}

export interface BeerEditRequest extends Request {
  body: {
    abv: number;
    brewer: string;
    description: string;
    name: string;
    type: string;
  };
}

export type Controller = {
  router: Router;
};
