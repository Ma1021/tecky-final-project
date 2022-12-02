import React, { useEffect, useState } from "react";
import "./PositionModule.css";
import PositionRow, { PositionRowProps } from "./PositionRow";

const PositionModule: React.FC = () => {
  const [userPosition, setUserPosition] = useState<PositionRowProps[]>([]);

  useEffect(() => {
    setUserPosition([
      {
        name: "Palantir",
        marketValue: 39840,
        currentPrice: 7.5,
        profit: -98133.89,
        ratio: 21.15,
        quantity: 5312,
        symbol: "PLTR",
        cost: 25.974,
        profitPercentage: -71.12,
      },
      {
        name: "特斯拉",
        marketValue: 194.7,
        currentPrice: 194.7,
        profit: 13.94,
        ratio: 0.1,
        quantity: 1,
        symbol: "TSLA",
        cost: 180.76,
        profitPercentage: (13.94 / 180.76) * 100,
      },
    ]);
  }, []);

  return (
    <>
      <div className="position-module-container">
        <div className="column-name-row">
          <div className="left-column-name">持倉股票</div>
          <div className="right-column-names">
            <span className="column-name">市值/數量</span>
            <span className="column-name">現價/成本</span>
            <span className="column-name">持倉盈虧</span>
            <span className="column-name">持倉占比</span>
          </div>
        </div>

        <div className="position-list-container">
          {userPosition.length > 0 ? (
            userPosition.map((positionRecord) => (
              <PositionRow
                name={positionRecord.name}
                marketValue={positionRecord.marketValue}
                currentPrice={positionRecord.currentPrice}
                profit={positionRecord.profit}
                ratio={positionRecord.ratio}
                quantity={positionRecord.quantity}
                symbol={positionRecord.symbol}
                cost={positionRecord.cost}
                profitPercentage={positionRecord.profitPercentage}
              />
            ))
          ) : (
            <div className="no-position">暫無持倉</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PositionModule;
