import React from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../redux/store";
import SmallStockChart from "./SmallStockChart";

interface StockRowProps {
  id: number;
  symbol: string;
  name: string;
  chineseName: string;
  currentPrice: number;
  yesterdayPrice: number;
  priceDifference: number;
}

const StockRow: React.FC<StockRowProps> = ({
  id,
  symbol,
  name,
  chineseName,
  currentPrice,
  yesterdayPrice,
  priceDifference,
}) => {
  const isChinese = useAppSelector((state) => state.theme.isChinese);

  const history = useHistory();
  return (
    <div
      className="stock-row"
      onClick={() => {
        history.push(`/individualStockInfo/${symbol}`);
      }}
    >
      <div className="stock-row-left">
        <div className="stock-row-name">{isChinese ? chineseName : name}</div>
        <div className="stock-row-symbol">{symbol}</div>
      </div>
      <div className="stock-row-right">
        <div className="stock-graph">
          <SmallStockChart
            id={id}
            symbol={symbol}
            positive={priceDifference > 0}
          />
        </div>
        <div
          className={
            "stock-row-column stock-price" +
            (priceDifference > 0 ? " positive" : " negative")
          }
        >
          {currentPrice.toFixed(3)}
        </div>
        <div
          className={
            "stock-row-column stock-other" +
            (priceDifference > 0 ? " positive" : " negative")
          }
        >
          <div>{((priceDifference / yesterdayPrice) * 100).toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default StockRow;
