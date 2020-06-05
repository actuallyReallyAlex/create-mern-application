import * as React from "react";
import { Beer } from "../types";

export interface BeerDisplayerProps {
  beers: Beer[];
}

const BeerDisplayer: React.SFC<BeerDisplayerProps> = ({ beers }) => (
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
      {beers.map((beer: Beer) => (
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
