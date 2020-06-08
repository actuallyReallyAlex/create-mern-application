import { starterBeers } from "../constants";

export const initializeStarterBeers = async () => {
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

export const getBeers = async () => {
  try {
    const response = await fetch("/beers");
    const beers = await response.json();
    return beers;
  } catch (error) {
    console.error(error);
  }
};

export const addBeer = async ({ abv, brewer, description, name, type }) => {
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
