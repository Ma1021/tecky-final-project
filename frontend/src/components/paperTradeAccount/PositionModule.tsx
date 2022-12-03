import React, { useEffect, useState } from "react";
import "./PositionModule.css";

interface PositionRow {
  name: string;
  marketValue: number;
  currentPrice: number;
  profit: number;
  ratio: number;
  quantity: number;
  symbol: string;
  cost: number;
  profitPercentage: number;
}

const PositionModule: React.FC = () => {
  const [userPosition, setUserPosition] = useState<PositionRow[]>([]);

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
      {userPosition.length > 0 ? (
        <table className="position-table">
          <tbody>
            <tr>
              <th className="position-table-column-name">持倉股票</th>
              <th className="position-table-column-name">市值/數量</th>
              <th className="position-table-column-name">現價/成本</th>
              <th className="position-table-column-name">持倉盈虧</th>
              <th className="position-table-column-name">持倉占比</th>
            </tr>
            {userPosition.map((positionRecord) => (
              <>
                <tr>
                  <td className="no-center">{positionRecord.name}</td>
                  <td>{positionRecord.marketValue.toFixed(2)}</td>
                  <td>{positionRecord.currentPrice.toFixed(2)}</td>
                  <td
                    className={
                      positionRecord.profit > 0 ? "positive" : "negative"
                    }
                  >
                    {positionRecord.profit > 0
                      ? `+${positionRecord.profit.toFixed(2)}`
                      : positionRecord.profit.toFixed(2)}
                  </td>
                  <td>{`${positionRecord.ratio.toFixed(2)}%`}</td>
                </tr>
                <tr className="position-bottom-row">
                  <td className="no-center">{positionRecord.symbol}</td>
                  <td>{positionRecord.quantity}</td>
                  <td>{positionRecord.cost.toFixed(3)}</td>
                  <td
                    className={
                      positionRecord.profitPercentage > 0
                        ? "positive"
                        : "negative"
                    }
                  >{`${positionRecord.profitPercentage.toFixed(2)}%`}</td>
                  <td></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-position">暫無持倉</div>
      )}
    </>
  );
};

export default PositionModule;
