<p align="center">
  <a href="https://github.com/alexlee-dev/create-mern-application" rel="noopener">
 <img width=256px height=256px src="https://res.cloudinary.com/alexlee-dev/image/upload/v1591215153/create-mern-application/create-mern-application.svg" alt="Logo"></a>
</p>

<h3 align="center">create-mern-application</h3>

<div align="center">

[![NPM](https://img.shields.io/npm/v/create-mern-application.svg)](https://www.npmjs.com/package/create-mern-application)
[![GitHub Issues](https://img.shields.io/github/issues/alexlee-dev/create-mern-application)](https://github.com/alexlee-dev/create-mern-application/issues)
[![Dependencies](https://img.shields.io/david/alexlee-dev/create-mern-application)](https://github.com/alexlee-dev/create-mern-application)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">A bootstrapper for creating a MERN application.
    <br> 
</p>

![Example of create-mern-application running](gifs/example.gif)

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

I've made a lot of MERN applications lately, and I want to make that process easier for myself and for others, by creating a bootstrapper that mirrors the simplicity of starting a new application with [create-react-app](https://github.com/facebook/create-react-app). Thus, **create-mern-application** was born.

### What is MERN?

- **M**ongoDB - [MongoDB](https://www.mongodb.com/) - Database
- **E**xpressJS - [ExpressJS](https://expressjs.com/) - BackEnd
- **R**eact - [React](https://reactjs.org/) - FrontEnd
- **N**ode - [Node](https://nodejs.org/) - Runtime Environment

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

- Node (>= v10.0.0)
- NPM

### OS

- [x] MacOS
- [x] Linux
- [x] Windows

### Installing

`npm install -g create-mern-application`

## 🎈 Usage <a name="usage"></a>

`create-mern-application cool-app-name`

### Changing the Source Language

By deafault, **create-mern-application** will create your application as a JavaScript project. You can pass the `--typescript` flag to create a TypeScript project instead.

`create-mern-application cool-app-name --typescript`

Want support for an additional language? Feel free to open a [new issue](https://github.com/alexlee-dev/create-mern-application/issues/new).

### Interactive Mode

You can choose to use the application in an interactive mode by passing the flag `--interactive`.

This mode grants you several additional options.

### Starting the Application

Please be sure to have your MongoDB instance running prior to starting your application.

`npm start`

## ⛏️ Built Using <a name = "built_using"></a>

### Dependencies

- [@sentry/node](https://sentry.io/welcome/) - Sentry is cross-platform application monitoring, with a focus on error reporting.
- [chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [commander](https://github.com/tj/commander.js) - Node.js command-line interfaces made easy.
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - Node.js: extra methods for the fs object like copy(), remove(), mkdirs().
- [inquirer](https://github.com/SBoudrias/Inquirer.js) - A collection of common interactive command line user interfaces.
- [ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner.
- [recursive-readdir](https://github.com/jergason/recursive-readdir) - Node.js module to list all files in a directory or any subdirectories.
- [semver](https://github.com/npm/node-semver) - The semver parser for node (the one npm uses).
- [update-notifier](https://github.com/yeoman/update-notifier) - Update notifications for your CLI app.
- [validate-npm-package-name](https://github.com/npm/validate-npm-package-name) - Is the given string an acceptable npm package name?

### DevDependencies

- [@babel/plugin-transform-runtime](https://www.npmjs.com/package/@babel/plugin-transform-runtime) - 🐠 Babel is a compiler for writing next generation JavaScript.
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - 🐠 Babel is a compiler for writing next generation JavaScript.
- [copyfiles](https://github.com/calvinmetcalf/copyfiles) - Copy files on the command line.
- [jest](https://jestjs.io/) - Delightful JavaScript Testing.
- [prettier](https://prettier.io/) - Prettier is an opinionated code formatter.
- [typescript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.

## ✍️ Authors <a name = "authors"></a>

- [Alex Lee](https://github.com/alexlee-dev) - Application Developer

## 🚀 Additional Features to Be Added

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Some inspiration from the developers behind [create-react-app](https://github.com/facebook/create-react-app).
