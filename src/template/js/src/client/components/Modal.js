import * as React from "react";
import DeleteBeerForm from "./forms/DeleteBeerForm";
import EditBeerForm from "./forms/EditBeerForm";
import NewBeerForm from "./forms/NewBeerForm";

const Modal = ({
  currentBeer,
  isModalOpen,
  modalContent,
  refreshBeers,
  setCurrentBeer,
  setIsModalOpen,
  setModalContent,
}) => {
  return (
    <>
      <div
        className={!isModalOpen ? "hidden" : undefined}
        id="shade"
        onClick={() => {
          if (isModalOpen) setIsModalOpen(false);
        }}
      />
      <div className={!isModalOpen ? "hidden" : undefined} id="modal">
        <div id="modal-close-container">
          <button
            id="modal-close"
            onClick={() => {
              setIsModalOpen(false);
              setModalContent(null);
            }}
          >
            x
          </button>
        </div>
        {modalContent === "newBeerForm" && (
          <NewBeerForm
            refreshBeers={refreshBeers}
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
          />
        )}
        {modalContent === "deleteBeerForm" && (
          <DeleteBeerForm
            currentBeer={currentBeer}
            refreshBeers={refreshBeers}
            setCurrentBeer={setCurrentBeer}
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
          />
        )}
        {modalContent === "editBeerForm" && (
          <EditBeerForm
            currentBeer={currentBeer}
            refreshBeers={refreshBeers}
            setCurrentBeer={setCurrentBeer}
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
          />
        )}
      </div>
    </>
  );
};

export default Modal;
