import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";

import { dependencies, devDependencies, devDependenciesTS } from "./constants";
import { executeCommand, valueReplacer } from "./util";

/**
 * Creates a project directory and a package.json inside that new directory.
 * @param applicationName Name of application.
 * @param language Language of application
 */
export const createProjectDirectory = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  // ? Needed?
  fs.ensureDirSync(root);

  console.log();
  console.log(`Creating a new MERN app in ${chalk.blueBright(root)}.`);
  console.log();
  console.log(
    `Source Language: ${
      language === "js"
        ? chalk.blueBright("JavaScript")
        : chalk.blueBright("TypeScript")
    }`
  );
  console.log();

  const tsScripts = {
    build: "npm run build-client && npm run build-server",
    "build-client": "rimraf dist && webpack --display=errors-only",
    "build-server":
      "rimraf build && tsc && copyfiles -f src/server/assets/**/* build/assets",
    dev: "env-cmd -e development npm run spinup",
    spinup: "node build/index.js",
    start:
      "start-server-and-test dev http://localhost:3000 'webpack-dev-server --info=false'",
    test: "start-server-and-test test-server http://localhost:3000 cy:run",
    "test-gui":
      "start-server-and-test test-server http://localhost:3000 cy:open",
    "test-server": "env-cmd -e test npm start",
  };

  const jsScripts = {
    build:
      "rimraf dist && webpack --display=errors-only && rimraf build && babel src/server --out-dir build",
    dev: "env-cmd -e development npm run spinup",
    spinup: "node build/index.js",
    start:
      "start-server-and-test dev http://localhost:3000 'webpack-dev-server --info=false'",
    test: "start-server-and-test test-server http://localhost:3000 cy:run",
    "test-gui":
      "start-server-and-test test-server http://localhost:3000 cy:open",
    "test-server": "env-cmd -e test npm start",
  };

  const scripts = {
    js: jsScripts,
    ts: tsScripts,
  };

  const packageJson = {
    name: applicationName,
    version: "0.0.0",
    description:
      "A MERN application bootstrapped with create-mern-application.",
    main: "build/index.js",
    scripts: scripts[language],
    keywords: [],
    author: "",
    license: "",
  };

  let spinner = ora("Creating Application directory and package.json");

  try {
    spinner.start();
    // * Create package.json
    await fs.writeFile(
      path.join(root, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
    spinner.succeed(
      "Application Directory and package.json created successfully"
    );
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Installs dependencies.
 * @param applicationName Name of application.
 */
export const installDependencies = async (
  applicationName: string
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Installing dependencies");

  try {
    spinner.start();
    const installCommand = "npm";
    let installArgs = ["install", "--save"];
    installArgs = installArgs.concat(dependencies);
    // * Verify that the directory exists 1st
    const pathExists = await fs.pathExists(root);
    if (pathExists) {
      // * Create a process that installs the dependencies
      await executeCommand(installCommand, installArgs, {
        cwd: root,
        shell: process.platform === "win32",
      });
      spinner.succeed("Dependencies installed successfully");
    } else {
      spinner.fail(`Path: ${root} does not exist.`);
      throw new Error(`Path: ${root} does not exist.`);
    }
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Installs dev dependencies.
 * @param applicationName Name of application.
 * @param language Language of application.
 */
export const installDevDependencies = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Installing devDependencies");

  try {
    spinner.start();
    const installCommand = "npm";
    let installArgs = ["install", "--save-dev"];
    installArgs = installArgs.concat(devDependencies);

    if (language === "ts") {
      installArgs = installArgs.concat(devDependenciesTS);
    } else {
      installArgs = installArgs.concat(devDependencies);
    }

    // * Verify that the directory exists 1st
    const pathExists = await fs.pathExists(root);
    if (pathExists) {
      // * Create a process that installs the dependencies
      await executeCommand(installCommand, installArgs, {
        cwd: root,
        shell: process.platform === "win32",
      });
      spinner.succeed("DevDependencies installed successfully");
    } else {
      spinner.fail(`Path: ${root} does not exist.`);
      throw new Error(`Path: ${root} does not exist.`);
    }
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Copies template files.
 * @param applicationName Name of application.
 * @param language Language of application.
 */
export const copyTemplateFiles = async (
  applicationName: string,
  language: "js" | "ts"
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Copying template files");

  try {
    spinner.start();
    const requiredFilesToCopy = [
      {
        src: path.join(__dirname, `template/${language}/src`),
        dest: path.join(root, "/src"),
      },
      {
        src: path.join(__dirname, `template/public`),
        dest: path.join(root, "/public"),
      },
      {
        src: path.join(__dirname, `template/env-cmdrc.json`),
        dest: path.join(root, "/.env-cmdrc.json"),
      },
      {
        src: path.join(__dirname, "template/README.md"),
        dest: path.join(root, "/README.md"),
      },
      {
        src: path.join(__dirname, "template/gitignore"),
        dest: path.join(root, "/.gitignore"),
      },
      {
        src: path.join(__dirname, `template/webpack-${language}.js`),
        dest: path.join(root, "/webpack.config.js"),
      },
    ];

    if (language === "ts") {
      requiredFilesToCopy.push({
        src: path.join(__dirname, `template/ts/index.d.ts`),
        dest: path.join(root, "/index.d.ts"),
      });
    }

    // * Copy Template Files
    await Promise.all(
      requiredFilesToCopy.map(
        async (fileInfo: { src: string; dest: string }) => {
          await fs.copy(fileInfo.src, fileInfo.dest);
          return;
        }
      )
    );

    // * Copy .babelrc for JS projects
    if (language === "js") {
      await fs.copy(
        path.join(__dirname, "template/babelrc"),
        path.join(root, "/.babelrc")
      );
    }

    spinner.succeed("Template files copied successfully");
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Replaces template files placeholder values with real values for the application.
 * @param applicationName Name of application.
 * @param language Language of application.
 * @param authorName Name of author.
 */
export const replaceTemplateValues = async (
  applicationName: string,
  language: "js" | "ts",
  authorName: string
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Replacing values in template files");
  try {
    spinner.start();

    const replaceFiles = [
      path.join(root, "README.md"),
      path.join(root, ".env-cmdrc.json"),
      path.join(root, "/public/index.html"),
      path.join(root, "/src/server/assets/site.webmanifest"),
    ];

    // * Apply real values to template files
    await Promise.all(
      valueReplacer(
        replaceFiles,
        /___APP NAME___/gm,
        applicationName,
        authorName
      )
    );
    spinner.succeed("Values in template files replaced successfully");
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Creates a tsconfig.json file in the application directory.
 * @param applicationName Name of application.
 */
export const createTSConfig = async (
  applicationName: string
): Promise<void> => {
  // * Application Directory
  const root = path.resolve(applicationName);

  let spinner = ora("Creating tsconfig.json");

  // * Basic tsconfig needed to build the application
  const tsConfig = {
    compilerOptions: {
      resolveJsonModule: true,
      skipLibCheck: true,
      target: "es5",
      module: "commonjs",
      lib: ["DOM", "DOM.Iterable", "ESNext"],
      jsx: "react",
      outDir: "./build",
      noEmit: false,
      isolatedModules: false,
      moduleResolution: "Node",
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ["./src/server/**/*", "./index.d.ts"],
  };

  try {
    spinner.start();
    // * Create tsconfig.json file
    await fs.writeFile(
      path.join(root, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2) + os.EOL
    );
    spinner.succeed("tsconfig.json created successfully");
  } catch (error) {
    spinner.fail();
    console.log("");
    throw new Error(error);
  }
};

/**
 * Display a success message to the user.
 * @param applicationName Name of application.
 */
export const displaySuccessMessage = (applicationName: string): void => {
  // * Application Directory
  const root = path.resolve(applicationName);

  console.log();
  console.log(
    `${chalk.greenBright("Success!")} Created ${chalk.blueBright(
      applicationName
    )} at ${chalk.blueBright(root)}`
  );
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.blueBright(`  npm run build`));
  console.log("    Creates a local build.");
  console.log();
  console.log(chalk.blueBright(`  npm start`));
  console.log("    Starts the application on your machine.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.blueBright(`  cd `) + chalk.blueBright(root));
  console.log(`  ${chalk.blueBright(`npm run build && npm start`)}`);
  console.log();
  console.log(
    chalk.blueBright("NOTE") +
      ": Please be sure to have your MongoDB instance running, prior to starting your application."
  );
  console.log();
  console.log(chalk.blueBright("Happy creating!"));
};
