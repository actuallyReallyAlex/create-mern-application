import { describe, test } from "@jest/globals";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { executeCommand } from "../build/util";
import { startApplication } from "./util";

describe("create-mern-application", () => {
  test("Create a JavaScript MERN application", async () => {
    const root = path.resolve("test-application-js");

    let spinner = ora("Creating JS application");

    try {
      // * Create Application
      spinner.start();
      await executeCommand("create-mern-application", ["test-application-js"], {
        shell: process.platform === "win32",
      });
      spinner.succeed("JS application created successfully");

      // * Build Application
      spinner = ora("Building application").start();
      await executeCommand("npm", ["run", "build"], {
        cwd: root,
        shell: process.platform === "win32",
      });
      spinner.succeed("Application successfully built");

      // * Start Application
      spinner = ora("Starting application").start();
      await startApplication(root, spinner);

      // * Cleanup
      spinner = ora("Performing cleanup").start();
      await fs.remove(root);
      spinner.succeed("Cleanup successful");
    } catch (error) {
      spinner.fail();
      console.log("");
      await fs.remove(root);
      throw new Error(error);
    }
  }, 180000);

  test("Create a TypeScript MERN application", async () => {
    const root = path.resolve("test-application-ts");

    let spinner = ora("Creating TS application");

    try {
      // * Create Application
      spinner.start();
      await executeCommand(
        "create-mern-application",
        ["test-application-ts", "--typescript"],
        {
          shell: process.platform === "win32",
        }
      );
      spinner.succeed("TS application created successfully");

      // * Build Application
      spinner = ora("Building application").start();
      await executeCommand("npm", ["run", "build"], {
        cwd: root,
        shell: process.platform === "win32",
      });
      spinner.succeed("Application successfully built");

      // * Start Application
      spinner = ora("Starting application").start();
      await startApplication(root, spinner);

      // * Cleanup
      spinner = ora("Performing cleanup").start();
      await fs.remove(root);
      spinner.succeed("Cleanup successful");
    } catch (error) {
      spinner.fail();
      console.log("");
      await fs.remove(root);
      throw new Error(error);
    }
  }, 180000);
});
