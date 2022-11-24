import React from "react";
import { useParams } from "react-router";
import { StockSymbol } from "./IndividualStockInfo";
import StockPageNavigationBar from "./StockPageNavigationBar";

export default function StockNews() {
  const stockSymbol = useParams<StockSymbol>();
  return (
    <>
      <h1>Stock News</h1>
      <StockPageNavigationBar symbol={`${stockSymbol.symbol}`} />
    </>
  );
}
