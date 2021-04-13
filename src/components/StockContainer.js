import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, onStockClick}) {
  const stockItems = stocks.map((stock) => 
    <Stock key={stock.id} stock={stock} onStockClick={onStockClick}/>
  )
  return (
    <div>
      <h2>Stocks</h2>
      {stockItems}
    </div>
  );
}

export default StockContainer;
