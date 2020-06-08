import * as React from "react";
import logo from "./logo.svg";
import BeerDisplayer from "./components/BeerDisplayer";
import { initializeStarterBeers, getBeers } from "./api/beer";
import Modal from "./components/Modal";

const App = () => {
  const [beers, setBeers] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  const refreshBeers = async () => {
    try {
      const beers = await getBeers();
      setBeers(beers);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const initializeData = async () => {
      try {
        let currentBeers = await getBeers();
        if (currentBeers.length === 0) {
          await initializeStarterBeers();
          currentBeers = await getBeers();
        }
        setBeers(currentBeers);
      } catch (error) {
        console.error(error);
      }
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
      <BeerDisplayer
        beers={beers}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
      <Modal
        isModalOpen={isModalOpen}
        modalContent={modalContent}
        refreshBeers={refreshBeers}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
    </div>
  );
};

export default App;
