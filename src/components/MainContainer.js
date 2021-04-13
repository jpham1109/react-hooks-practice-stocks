import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks ] = useState([])
  const [sort, setSort] = useState("")
  const [filter, setFilter] = useState("All")
  const [portfolio, setPortfolio] = useState([])

 
  useEffect (() => {
    fetch("http://localhost:3001/stocks")
    .then(r => r.json())
    .then(setStocks)
  }, [])

  function handleSort(event) {
    setSort(event.target.value)
  }

  function handleFilter(event) {
    setFilter(event.target.value)
  }

  function handleAddStock(stockToAdd) {
    const stockInPortfolio = portfolio.find((stock) => stock.id === stockToAdd.id )
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd])
    }
  }

  function handleRemoveStock(stockToRemove) {
    setPortfolio(portfolio => portfolio.filter((stock) => stock.id !== stockToRemove.id))
  }

  const stocksToDisplay = [...stocks].sort((stockA, stockB) => {
    if (sort === "Alphabetically") {
      return stockA.ticker.localeCompare(stockB.ticker)
    } else if (sort === "Price") {
      return stockA.price - stockB.price
    } else {
      return stockA, stockB
    }
  })
  .filter((stock) => {
    if (filter !== "All") {
      return stock.type === filter
    } else {
      return stock
    }
  })

  return (
    <div>
      <SearchBar onSort={sort} onSortCheck={handleSort} onFilter={filter} onFilterSelect={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocksToDisplay} onStockClick={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onRemoveStock={handleRemoveStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
