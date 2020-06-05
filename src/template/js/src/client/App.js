import * as React from "react";
import logo from "./logo.svg";
import BeerDisplayer from "./components/BeerDisplayer";
import { initializeStarterBeers, getBeers } from "./api/beer";

const App = () => {
  const [beers, setBeers] = React.useState([]);

  React.useEffect(() => {
    const initializeData = async () => {
      try {
        let currentBeers = await getBeers();
        if (currentBeers.length === 0) {
          await initializeStarterBeers();
          currentBeers = await getBeers();
        }
        setBeers(currentBeers);
      } catch (error) {}
    };
    initializeData();
  }, []);

  return (
    <div id="app">
      <img alt="Logo" id="logo" src={logo} />
      <h1>___APP NAME___</h1>
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
      <BeerDisplayer beers={beers} />
    </div>
  );
};

export default App;
