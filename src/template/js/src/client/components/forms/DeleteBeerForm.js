import * as React from "react";
import { deleteBeer } from "../../api/beer";

const DeleteBeerForm = ({
  currentBeer,
  refreshBeers,
  setCurrentBeer,
  setIsModalOpen,
  setModalContent,
}) => {
  return (
    <form
      className="form"
      id="delete-beer-form"
      onSubmit={async (e) => {
        e.preventDefault();
        await deleteBeer(currentBeer._id);
        setIsModalOpen(false);
        setModalContent(null);
        refreshBeers();
        setCurrentBeer(null);
      }}
    >
      <h3>Delete Beer</h3>
      <p>Are you sure you want to delete this beer?</p>
      <label htmlFor="abv">ABV</label>
      <input disabled id="abv" value={currentBeer.abv} />
      <label htmlFor="brewer">Brewer</label>
      <input disabled id="brewer" value={currentBeer.brewer} />
      <label htmlFor="description">Description</label>
      <input disabled id="description" value={currentBeer.description} />
      <label htmlFor="name">Name</label>
      <input disabled id="name" value={currentBeer.name} />
      <label htmlFor="type">Type</label>
      <input disabled id="type" value={currentBeer.type} />
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteBeerForm;
