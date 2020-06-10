/**
 * These dependencies are required for the mern application regardless of language.
 */
export const dependencies = [
  "chalk",
  "cors",
  "express",
  "mongoose",
  "morgan",
  "node-fetch",
  "react",
  "react-dom",
];

/**
 * These dev dependencies are for JavaScript projects.
 */
export const devDependencies = [
  "@babel/core",
  "@babel/cli",
  "@babel/plugin-transform-runtime",
  "@babel/preset-env",
  "@babel/preset-react",
  "@babel/runtime",
  "@svgr/webpack",
  "babel-loader",
  "clean-webpack-plugin",
  "copyfiles",
  "css-loader",
  "env-cmd",
  "html-webpack-plugin",
  "rimraf",
  "source-map-loader",
  "start-server-and-test",
  "style-loader",
  "url-loader",
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
  "@types/react",
  "@types/react-dom",
  "@types/cors",
  "@types/express",
  "@types/mongoose",
  "@types/morgan",
  "@types/node-fetch",
];

/**
 * These dev dependencies are for TypeScript projects.
 */
export const devDependenciesTS = [
  "@svgr/webpack",
  "@types/chalk",
  "@types/cors",
  "@types/express",
  "@types/morgan",
  "@types/react",
  "@types/react-dom",
  "clean-webpack-plugin",
  "copyfiles",
  "css-loader",
  "env-cmd",
  "html-webpack-plugin",
  "rimraf",
  "source-map-loader",
  "start-server-and-test",
  "style-loader",
  "ts-loader",
  "typescript",
  "url-loader",
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
];

export const buildFilesToCopy = [
  {
    src: "src/server/assets",
    dest: "dist/server/assets",
  },
  {
    src: "src/client/index.css",
    dest: "dist/client/index.css",
  },
  {
    src: "src/client/logo.svg",
    dest: "dist/client/logo.svg",
  },
];

export const buildFilesToRemove = [
  "dist",
  "index.d.ts",
  "template-tsconfig.json",
  "/src/client/types.js",
  "/src/server/types.js",
];

export const dependenciesToCleanup = [
  "@types/cors",
  "@types/express",
  "@types/mongoose",
  "@types/morgan",
  "@types/node-fetch",
  "@types/react",
  "@types/react-dom",
];
