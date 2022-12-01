import React from "react";
import "./PositionRow.css";

export interface PositionRowProps {
  name: string;
  marketValue: number;
  currentPrice: number;
  profit: number;
  ratio: number;
  symbol: string;
  cost: number;
  profitPercentage: number;
  quantity: number;
}

const PositionRow: React.FC<PositionRowProps> = ({
  name,
  marketValue,
  currentPrice,
  profit,
  ratio,
  symbol,
  cost,
  profitPercentage,
  quantity,
}) => {
  return (
    <>
      <div className="position-row-container">
        <div className="position-first-column">
          <div className="position-stock-name">{name}</div>
          <div className="position-stock-symbol">{symbol}</div>
        </div>

        <div className="position-row-right-container">
          <div className="position-second-column">
            <div className="position-market-value">
              {marketValue.toFixed(2)}
            </div>
            <div className="position-stock-quantity gray">{quantity}</div>
          </div>

          <div className="position-third-column">
            <div className="position-current-price">
              {currentPrice.toFixed(2)}
            </div>
            <div className="position-stock-cost gray">{cost.toFixed(3)}</div>
          </div>

          <div className="position-fourth-column">
            <div
              className={
                "position-stock-profit " +
                (profit === 0 ? "gray" : profit > 0 ? "positive" : "negative")
              }
            >
              {profit > 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2)}
            </div>
            <div
              className={
                "stock-profit-percentage " +
                (profit === 0 ? "gray" : profit > 0 ? "positive" : "negative")
              }
            >
              {profitPercentage > 0
                ? `+${profitPercentage.toFixed(2)}`
                : profitPercentage.toFixed(2)}
              %
            </div>
          </div>

          <div className="position-fifth-column">
            <div className="position-stock-ratio">{ratio.toFixed(2)}</div>
            <div className="empty"></div>
          </div>
        </div>
      </div>

      {/* <div className="position-top-row">
        <div className="position-row-left-container">
          <span className="position-stock-name">{name}</span>
        </div>
        <div className="position-row-right-container">
          <span className="position-market-value">
            {marketValue.toFixed(2)}
          </span>
          <span className="position-current-price">
            {currentPrice.toFixed(2)}
          </span>
          <span
            className={
              "position-stock-profit " +
              (profit === 0 ? "gray" : profit > 0 ? "positive" : "negative")
            }
          >
            {profit > 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2)}
          </span>
          <span className="position-stock-ratio">{ratio.toFixed(2)}</span>
        </div>
      </div>
      <div className="position-bottom-row">
        <div className="position-row-left-container">
          <span className="position-stock-symbol">{symbol}</span>
        </div>
        <div className="position-row-right-container">
          <span className="position-stock-quantity gray">{quantity}</span>
          <span className="position-stock-cost gray">{cost.toFixed(3)}</span>
          <span
            className={
              "stock-profit-percentage " +
              (profit === 0 ? "gray" : profit > 0 ? "positive" : "negative")
            }
          >
            {profitPercentage > 0
              ? `+${profitPercentage.toFixed(2)}`
              : profitPercentage.toFixed(2)}
            %
          </span>
          <span className="empty"></span>
        </div>
      </div> */}
    </>
  );
};

export default PositionRow;
