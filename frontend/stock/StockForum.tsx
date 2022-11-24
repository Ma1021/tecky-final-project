import React from "react";
import { useParams } from "react-router";
import { StockSymbol } from "./IndividualStockInfo";
import StockPageNavigationBar from "./StockPageNavigationBar";

export default function StockForum() {
  const stockSymbol = useParams<StockSymbol>();
  console.log(stockSymbol);

  return (
    <>
      <h1>Stock Forum</h1>
      <StockPageNavigationBar symbol={`${stockSymbol.symbol}`} />
    </>
  );
}
