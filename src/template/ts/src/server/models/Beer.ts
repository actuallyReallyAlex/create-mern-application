import mongoose from "mongoose";

const beerSchema = new mongoose.Schema(
  {
    abv: {
      required: true,
      type: Number,
    },
    brewer: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

function applicationToJSON(): void {
  return this.toObject();
}

beerSchema.methods.toJSON = applicationToJSON;

const Beer = mongoose.model("Beer", beerSchema);

export default Beer;
