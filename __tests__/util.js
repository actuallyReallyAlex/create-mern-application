import fs from "fs-extra";

/**
 * Checks if the file matches the expected content.
 * @param {string} src Path to file.
 * @param {string | buffer} fileContents File contents.
 * @returns {Promise<boolean>}
 */
export const fileMatcher = (src, fileContents) =>
  new Promise(async (resolve, reject) => {
    try {
      const srcFileContents = await fs.readFile(src);
      resolve(srcFileContents.toString() === fileContents.toString());
    } catch (error) {
      reject(error);
    }
  });
