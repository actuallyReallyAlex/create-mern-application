import * as React from "react";
import logo from "./logo.svg";
import { initializeStarterBeers, getBeers } from "./api/beer";
import BeerDisplayer from "./components/BeerDisplayer";
import LoadingIndicator from "./components/LoadingIndicator";
import Modal from "./components/Modal";

const App: React.SFC<{}> = () => {
  const [beers, setBeers] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [currentBeer, setCurrentBeer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const refreshBeers = async (): Promise<void> => {
    try {
      const beers = await getBeers();
      setBeers(beers);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect((): void => {
    const initializeData = async (): Promise<void> => {
      try {
        let currentBeers = await getBeers();
        if (currentBeers.length === 0) {
          await initializeStarterBeers();
          currentBeers = await getBeers();
        }
        setBeers(currentBeers);
        setIsLoading(false);
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
      <a
        href="https://github.com/alexlee-dev/create-mern-application/"
        rel="noopener noreferrer"
        target="_blank"
      >
        View Documentation
      </a>
      <BeerDisplayer
        beers={beers}
        setCurrentBeer={setCurrentBeer}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
      <Modal
        currentBeer={currentBeer}
        isModalOpen={isModalOpen}
        modalContent={modalContent}
        refreshBeers={refreshBeers}
        setCurrentBeer={setCurrentBeer}
        setIsLoading={setIsLoading}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
      <LoadingIndicator isLoading={isLoading} />
    </div>
  );
};

export default App;
