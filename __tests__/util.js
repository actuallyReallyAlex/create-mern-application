import { spawn } from "child_process";

/**
 * Starts the application.
 * @param {string} root Root of the application.
 * @param {Ora} spinner Ora spinner instance.
 * @param {boolean} debug Will log extra info to console.
 */
export const startApplication = (root, spinner, debug = false) =>
  new Promise((resolve, reject) => {
    try {
      let startError;
      const cp = spawn("npm", ["run", "start"], {
        cwd: root,
        shell: process.platform === "win32",
      });

      if (debug) {
        cp.stdout.on("data", (data) => console.log(`stdout: ${data}`));
        cp.stderr.on("data", (data) => console.log(`stderr: ${data}`));
        cp.on("message", (message) => console.log({ message }));
      }

      cp.on("error", (err) => {
        if (err) startError = err;
      });

      cp.on("exit", (code) => {
        if (code !== 0) startError = code;
      });

      setTimeout(() => {
        if (startError) {
          spinner.fail();
          console.log("");
          console.error(startError);
        }
        if (debug) console.log("KILLING PROCESS");
        cp.kill();
        spinner.succeed("Application started successfully");
        resolve();
      }, 20000);
    } catch (error) {
      reject(error);
    }
  });
