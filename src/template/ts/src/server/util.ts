import fetch from "node-fetch";

export const checkIfMongoDBIsRunning = async (): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        process.env.MONGODB_URL.replace(/mongodb:\/\//gm, "http://")
      );
      if (response.status !== 200) return resolve(false);
      return resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
