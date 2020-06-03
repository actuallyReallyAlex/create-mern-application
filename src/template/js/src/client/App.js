import * as React from "react";
import logo from "./logo.svg";

const App = () => {
  return (
    <div id="app">
      <img alt="Logo" id="logo" src={logo} />
      <h1>create-mern-application</h1>
      <p>
        Edit <code>src/client/App.tsx</code> and save to reload.
      </p>
      <a
        href="https://github.com/alexlee-dev/create-mern-application/"
        rel="noopener noreferrer"
        target="_blank"
      >
        View Documentation
      </a>
    </div>
  );
};

export default App;
