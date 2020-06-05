import { describe, expect, it, test } from "@jest/globals";
import fs from "fs-extra";
import path from "path";
import { executeCommand } from "../build/util";
import { fileMatcher } from "./util";

describe("create-mern-application", () => {
  test("Create a JavaScript MERN application", async () => {
    const root = path.resolve("test-application");

    let verificationArr;

    try {
      await executeCommand("create-mern-application", ["test-application"]);

      const templateBase = path.join(__dirname, "../src/template");

      const filesToVerify = [
        {
          src: path.join(root, ".babelrc"),
          fileContentsSrc: path.join(templateBase, "/babelrc"),
        },
        {
          src: path.join(root, ".env-cmdrc.json"),
          fileContentsSrc: path.join(__dirname, "./fixtures/.env-cmdrc.json"),
        },
        {
          src: path.join(root, ".gitignore"),
          fileContentsSrc: path.join(templateBase, "gitignore"),
        },
        {
          src: path.join(root, "package.json"),
          fileContentsSrc: path.join(__dirname, "./fixtures/package-js.json"),
        },
        {
          src: path.join(root, "/public/index.html"),
          fileContentsSrc: path.join(__dirname, "./fixtures/index.html"),
        },
        {
          src: path.join(root, "README.md"),
          fileContentsSrc: path.join(__dirname, "./fixtures/README.md"),
        },
        {
          src: path.join(root, "webpack.config.js"),
          fileContentsSrc: path.join(templateBase, "webpack-js.js"),
        },
        {
          src: path.join(root, "/src/server/assets/site.webmanifest"),
          fileContentsSrc: path.join(__dirname, "./fixtures/site.webmanifest"),
        },
      ];

      verificationArr = await Promise.all(
        filesToVerify.map(async ({ src, fileContentsSrc }) => {
          const fileContents = await fs.readFile(fileContentsSrc);
          const doesFileMatch = await fileMatcher(src, fileContents);
          return { doesFileMatch, src };
        })
      );

      await executeCommand("rimraf", [root], {
        shell: process.platform === "win32",
      });
    } catch (error) {
      await executeCommand("rimraf", [root], {
        shell: process.platform === "win32",
      });
      throw new Error(error);
    }

    expect(verificationArr).toEqual(
      verificationArr.map(({ src }) => ({
        doesFileMatch: true,
        src,
      }))
    );
  }, 120000);

  test("Create a TypeScript MERN application", async () => {
    const root = path.resolve("test-application");

    let verificationArr;

    try {
      await executeCommand("create-mern-application", [
        "test-application",
        "--typescript",
      ]);

      const templateBase = path.join(__dirname, "../src/template");

      const filesToVerify = [
        {
          src: path.join(root, ".env-cmdrc.json"),
          fileContentsSrc: path.join(__dirname, "./fixtures/.env-cmdrc.json"),
        },
        {
          src: path.join(root, ".gitignore"),
          fileContentsSrc: path.join(templateBase, "gitignore"),
        },
        {
          src: path.join(root, "index.d.ts"),
          fileContentsSrc: path.join(templateBase, "/ts/index.d.ts"),
        },
        {
          src: path.join(root, "package.json"),
          fileContentsSrc: path.join(__dirname, "./fixtures/package-ts.json"),
        },
        {
          src: path.join(root, "/public/index.html"),
          fileContentsSrc: path.join(__dirname, "./fixtures/index.html"),
        },
        {
          src: path.join(root, "README.md"),
          fileContentsSrc: path.join(__dirname, "./fixtures/README.md"),
        },
        {
          src: path.join(root, "tsconfig.json"),
          fileContentsSrc: path.join(__dirname, "./fixtures/tsconfig.json"),
        },
        {
          src: path.join(root, "webpack.config.js"),
          fileContentsSrc: path.join(templateBase, "webpack-ts.js"),
        },
        {
          src: path.join(root, "/src/server/assets/site.webmanifest"),
          fileContentsSrc: path.join(__dirname, "./fixtures/site.webmanifest"),
        },
      ];

      verificationArr = await Promise.all(
        filesToVerify.map(async ({ src, fileContentsSrc }) => {
          const fileContents = await fs.readFile(fileContentsSrc);
          const doesFileMatch = await fileMatcher(src, fileContents);
          return { doesFileMatch, src };
        })
      );

      await executeCommand("rimraf", [root], {
        shell: process.platform === "win32",
      });
    } catch (error) {
      await executeCommand("rimraf", [root], {
        shell: process.platform === "win32",
      });
      throw new Error(error);
    }

    expect(verificationArr).toEqual(
      verificationArr.map(({ src }) => ({
        doesFileMatch: true,
        src,
      }))
    );
  }, 120000);
});
