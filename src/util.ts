import chalk from "chalk";
import { spawn } from "child_process";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import validateProjectName from "validate-npm-package-name";

import { FileCopy } from "./types";

/**
 * Executes a command in a spawned process.
 * @param command Command to execute in the process.
 * @param args Additional arguments to attach to the command.
 * @param options Optional options object to pass along.
 * @param debug Optional logging of output.
 */
export const executeCommand = async (
  command: string,
  args?: string[],
  options?: { cwd?: string; path?: string; shell?: boolean },
  debug?: boolean
): Promise<void | { code: number; signal: any }> =>
  new Promise((resolve, reject) => {
    const cp = spawn(command, args, options);
    if (debug) {
      cp.stdout.on("data", (data) => console.log(`stdout: ${data}`));
      cp.stderr.on("data", (data) => console.log(`stderr: ${data}`));
    }

    cp.on("error", (err: Error) => {
      if (err) {
        console.log("");
        reject(err.message);
      }
    });
    cp.on("exit", (code: number | null, signal) => {
      if (code !== 0) {
        console.log("");
        reject({ args, command, code, signal, options });
      }
      resolve();
    });
    cp.on("message", (message) => console.log({ message }));
  });

/**
 * Clean up created directory and files if error occurs.
 * @param applicationName Name of application.
 */
export const cleanupError = async (
  applicationName: string | undefined
): Promise<void> => {
  try {
    if (!applicationName) {
      return;
    }

    // * Application Directory
    const root = path.resolve(applicationName);

    const rootExists = await fs.pathExists(root);

    if (rootExists) {
      await executeCommand("rimraf", [root], {
        shell: process.platform === "win32",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Overwrites a file with new content from replace.
 * @param src Path to file, or directory to replace values in.
 * @param token What to search for.
 * @param replacement What to replace the token with.
 */
const overwrite = (src: string, token: string | RegExp, replacement: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const file = await fs.readFile(src, "utf-8");
      let newFileContent = file.replace(token, replacement);
      await fs.writeFile(src, newFileContent, "utf8");
      resolve();
    } catch (error) {
      reject(error);
    }
  });

/**
 * Replaces values in a file or directory of files.
 * @param src Path to file, or directory to replace values in.
 * @param token What to search for.
 * @param replacement What to replace the token with.
 */
export const replace = (
  src: string,
  token: string | RegExp,
  replacement: string
) =>
  new Promise(async (resolve, reject) => {
    try {
      const stats = await fs.stat(src);
      // * Check if `src` is a single file or is a directory
      const isDirectory = stats.isDirectory();

      console.log({ isDirectory });

      if (isDirectory) {
        // * If directory
        // * Recursively go through each content and
        // * If it's a file, add it to the contents list
        // * If it's a directory, dive into it
        const files: string[] = [];
        const directories: string[] = [src];

        let currentDirString = await fs.readdir(src);
        let currentDirContents = currentDirString.map(
          (fileName: string) => `${src}/${fileName}`
        );

        // * Recursively separate into files/directories

        console.log({
          files,
          directories,
          currentDirString,
          currentDirContents,
        });

        while (directories.length > 0) {
          for (let i = 0; i < currentDirContents.length; i++) {
            const content = currentDirContents[i];
            console.log({ content });
            fs.stat(content, (err, stats) => {
              const isDirectory = stats.isDirectory();
              if (isDirectory) {
                directories.push(content);
              } else {
                files.push(content);
              }
            });
          }
        }

        console.log({ files });
        console.log({ directories });

        // const files = dirContents.map(
        //   (fileName: string) => `${src}/${fileName}`
        // );
        // await Promise.all(
        //   files.map(async (fileName: string) => {
        //     console.log(fileName);
        //     await overwrite(fileName, token, replacement);
        //     return;
        //   })
        // );

        resolve();
      } else {
        // * If single file
        // * Replace all values in file
        await overwrite(src, token, replacement);
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });

/**
 * Validates the application name according to NPM naming conventions.
 * @param applicationName Name of application.
 */
export const validateApplicationName = (applicationName: any) => {
  const validation = validateProjectName(applicationName);
  if (!validation.validForNewPackages) {
    console.error(
      `Cannot create an application named ${chalk.red(
        `"${applicationName}"`
      )} because of npm naming restrictions:`
    );
    console.log("");

    [...(validation.errors || []), ...(validation.warnings || [])].forEach(
      (error) => {
        console.error(chalk.red(`  * ${error}`));
      }
    );

    console.log("");
    console.error("Please choose a different application name.");
    process.exit(1);
  }
};

/**
 * Verifies that the application can run. Needs >= Node v10.0.0
 */
export const verifyNodeVersion = (): void => {
  if (!semver.satisfies(process.version, ">=10.0.0")) {
    console.error(
      chalk.red(`create-mern-application requires Node v10 or higher.`)
    );
    console.error(chalk.red(`You are running Node ${process.version}.`));
    console.error(chalk.red(`Please update your version of Node.`));
    process.exit(1);
  }
};

/**
 * Generates an array of files to copy during the template process.
 * @param dir __dirname.
 * @param root Root application directory.
 * @param language Language of application.
 */
export const generateFilesToCopyArr = (
  dir: string,
  root: string,
  language: "js" | "ts"
): FileCopy[] => {
  const filesToCopy = [
    {
      src: path.join(dir, `template/src`),
      dest: path.join(root, "/src"),
    },
    {
      src: path.join(dir, `template/public`),
      dest: path.join(root, "/public"),
    },
    {
      src: path.join(dir, `template/env-cmdrc.json`),
      dest: path.join(root, "/.env-cmdrc.json"),
    },
    {
      src: path.join(dir, "template/README.md"),
      dest: path.join(root, "/README.md"),
    },
    {
      src: path.join(dir, "template/gitignore"),
      dest: path.join(root, "/.gitignore"),
    },
    {
      src: path.join(dir, `template/webpack-${language}.js`),
      dest: path.join(root, "/webpack.config.js"),
    },
    {
      src: path.join(dir, `template/template-tsconfig.json`),
      dest: path.join(root, "/template-tsconfig.json"),
    },
    {
      src: path.join(dir, `template/index.d.ts`),
      dest: path.join(root, "/index.d.ts"),
    },
  ];

  // * Copy .babelrc for JS projects
  if (language === "js")
    filesToCopy.push({
      src: path.join(dir, "template/babelrc"),
      dest: path.join(root, "/.babelrc"),
    });

  return filesToCopy;
};
