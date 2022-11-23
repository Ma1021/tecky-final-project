import React, { useEffect, useState } from "react";
import "./StockList.css";
import StockRow from "./StockRow";
// import SortingRow from "./SortingRow";

interface UserStock {
  user_id: number;
  stock_id: number;
  symbol: string;
}

export default function StockList() {
  const userID = 1;
  const [stockList, setStockList] = useState<UserStock[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/getMyList?userID=${userID}`)
      .then((response) => response.json())
      .then((result) => {
        setStockList(result);
      });
  }, []);

  return (
    <div>
      <h1>Stock list</h1>
      {/* <SortingRow /> */}
      {stockList.map((item) => (
        <StockRow
          stockSymbol={item.symbol}
          stockID={item.stock_id}
          key={item.stock_id}
        />
      ))}
    </div>
  );
}
