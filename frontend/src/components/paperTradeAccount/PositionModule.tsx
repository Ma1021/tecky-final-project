import React, { useEffect, useState } from "react";
import "./PositionModule.css";

interface PositionRow {
  id: number;
  name: string;
  chineseName: string;
  marketValue: number;
  currentPrice: number;
  profit: number;
  ratio: number;
  quantity: number;
  symbol: string;
  cost: number;
  profitPercentage: number;
}

interface PositionModuleProps {
  currentAccount: string;
}

interface PositionFromDB {
  id: number;
  symbol: string;
  name: string;
  chinese_name: string;
  cost: string;
  current_price: string;
  quantity: number;
}

const PositionModule: React.FC<PositionModuleProps> = ({ currentAccount }) => {
  const [userPosition, setUserPosition] = useState<PositionRow[]>([]);
  const userID = 1;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getPositionList?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result: PositionFromDB[]) => {
        const resultArray: PositionRow[] = [];
        let totalMarketValue = 0;
        result.forEach(
          (obj) =>
            (totalMarketValue =
              totalMarketValue + obj.quantity * parseFloat(obj.current_price))
        );

        result.map((obj) => {
          const marketValue = obj.quantity * parseFloat(obj.current_price);
          const profit =
            (parseFloat(obj.current_price) - parseFloat(obj.cost)) *
            obj.quantity;
          const profitPercentage =
            (profit / parseFloat(obj.cost) / obj.quantity) * 100;
          const ratio = (marketValue / totalMarketValue) * 100;

          resultArray.push({
            id: obj.id,
            symbol: obj.symbol,
            name: obj.name,
            chineseName: obj.chinese_name,
            cost: parseFloat(obj.cost),
            marketValue: marketValue,
            currentPrice: parseFloat(obj.current_price),
            quantity: obj.quantity,
            profit: profit,
            profitPercentage: profitPercentage,
            ratio: ratio,
          });
        });

        setUserPosition(resultArray);
      });
  }, [currentAccount]);

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
                <tr className="position-upper-row">
                  <td className="no-center">{positionRecord.chineseName}</td>
                  <td>{positionRecord.marketValue.toFixed(2)}</td>
                  <td>{positionRecord.currentPrice.toFixed(2)}</td>
                  <td
                    className={
                      positionRecord.profit === 0
                        ? ""
                        : positionRecord.profit > 0
                        ? "positive"
                        : "negative"
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
                      positionRecord.profitPercentage === 0
                        ? ""
                        : positionRecord.profitPercentage > 0
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
