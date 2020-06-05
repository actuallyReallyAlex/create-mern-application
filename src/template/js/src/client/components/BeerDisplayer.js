import * as React from "react";

const BeerDisplayer = ({ beers }) => (
  <table>
    <thead>
      <tr>
        <th className="column1">ABV</th>
        <th>Brewer</th>
        <th>Description</th>
        <th>Name</th>
        <th className="column5">Type</th>
      </tr>
    </thead>
    <tbody>
      {beers.map((beer) => (
        <tr key={beer._id}>
          <td className="column1">{beer.abv}</td>
          <td>{beer.brewer}</td>
          <td>{beer.description}</td>
          <td>{beer.name}</td>
          <td className="column5">{beer.type}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BeerDisplayer;
