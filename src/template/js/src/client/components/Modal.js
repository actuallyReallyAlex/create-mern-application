import * as React from "react";
import NewBeerForm from "./forms/NewBeerForm";

const Modal = ({
  isModalOpen,
  modalContent,
  refreshBeers,
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
        <NewBeerForm
          refreshBeers={refreshBeers}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default Modal;
