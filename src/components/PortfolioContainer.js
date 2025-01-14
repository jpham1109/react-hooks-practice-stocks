import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, onRemoveStock}) {
  const myStocks = portfolio.map((stock) => 
    <Stock key={stock.id} stock={stock} onStockClick={onRemoveStock}/>
  )
  return (
    <div>
      <h2>My Portfolio</h2>
      {myStocks}
    </div>
  );
}

export default PortfolioContainer;
