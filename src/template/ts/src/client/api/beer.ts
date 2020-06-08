import { starterBeers } from "../constants";
import { Beer } from "../types";

export const initializeStarterBeers = async (): Promise<void> => {
  try {
    starterBeers.forEach(async ({ abv, brewer, description, name, type }) => {
      await fetch("/beer", {
        body: JSON.stringify({
          abv,
          brewer,
          description,
          name,
          type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    });

    return;
  } catch (error) {
    console.error(error);
  }
};

export const getBeers = async (): Promise<Beer[]> => {
  try {
    const response = await fetch("/beers");
    const beers: Beer[] = await response.json();
    return beers;
  } catch (error) {
    console.error(error);
  }
};

export const addBeer = async ({
  abv,
  brewer,
  description,
  name,
  type,
}): Promise<void> => {
  try {
    await fetch("/beer", {
      body: JSON.stringify({
        abv,
        brewer,
        description,
        name,
        type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (error) {
    console.error(error);
  }
};
