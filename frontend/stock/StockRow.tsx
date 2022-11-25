import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import SmallStockChart from "./SmallStockChart";

interface stockInfo {
  id: number;
  symbol: string;
  name: string;
  currentPrice: number;
  yesterdayPrice: number;
}

export default function StockRow(props: {
  stockSymbol: string;
  stockID: number;
}) {
  const [stockInfo, setStockInfo] = useState<stockInfo>({
    id: 0,
    symbol: "",
    name: "",
    currentPrice: 0,
    yesterdayPrice: 0,
  });
  const [isUpdated, setIsUpdated] = useState<Boolean>(false);
  const [isPositive, setIsPositive] = useState<Boolean>();

  useEffect(() => {
    fetch(`http://localhost:4000/getSomeDataFromStockInfo?id=${props.stockID}`)
      .then((res) => res.json())
      .then((result) => {
        setStockInfo(() =>
          Object.assign(stockInfo, {
            id: result[0].id,
            name: result[0].name,
            symbol: result[0].symbol,
            currentPrice: result[0].currentprice,
            yesterdayPrice: result[0].yesterdayprice,
          })
        );

        result[0].currentprice - result[0].yesterdayprice > 0
          ? setIsPositive(true)
          : setIsPositive(false);

        setIsUpdated(true);
      });
  }, []);

  let memoPercentChange: number = useMemo(
    () => updatePercent(),
    [stockInfo, isUpdated]
  );

  function updatePercent() {
    if (stockInfo.currentPrice <= 0 || stockInfo.yesterdayPrice <= 0) {
      return 0;
    }

    return (
      ((stockInfo.currentPrice - stockInfo.yesterdayPrice) /
        stockInfo.yesterdayPrice) *
      100
    );
  }

  return (
    <Link to={`/individualStockInfo/${props.stockSymbol}`} className="link">
      <div className="stock-row">
        <div className="stock-row-left">
          <div className="stock-row-name">{stockInfo.name}</div>
          <div className="stock-row-symbol">{stockInfo.symbol}</div>
        </div>
        <div className="stock-row-right">
          <div className="stock-graph">
            <SmallStockChart id={props.stockID} symbol={props.stockSymbol} />
          </div>
          <div
            className={
              "stock-row-column stock-price" +
              (isPositive ? " positive" : " negative")
            }
          >
            {stockInfo.currentPrice.toFixed(3)}
          </div>
          <div
            className={
              "stock-row-column stock-other" +
              (isPositive ? " positive" : " negative")
            }
          >
            <div>{memoPercentChange.toFixed(2)}%</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
