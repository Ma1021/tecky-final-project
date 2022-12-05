import { useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./PositionModule.css";

interface PositionRow {
  id: number;
  name: string;
  long: boolean;
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

const PositionModule: React.FC<PositionModuleProps> = ({ currentAccount }) => {
  const [userPosition, setUserPosition] = useState<PositionRow[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [ionAlert] = useIonAlert();
  const userID = 1;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getPositionList?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        setUserPosition(result);
      });
  }, [currentAccount, isUpdate]);

  async function closePosition(
    id: number,
    useID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string
  ) {
    const data = { id, userID, symbol, isLong, price, quantity, account };
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/closePosition`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    setIsUpdate(!isUpdate);
  }

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
              <React.Fragment key={positionRecord.id}>
                <tr
                  className="position-upper-row"
                  onClick={() => {
                    ionAlert({
                      header: "平倉離場?",
                      buttons: [
                        { text: "取消", role: "dismiss" },
                        {
                          text: "確認",
                          role: "confirm",
                          handler: () =>
                            closePosition(
                              positionRecord.id,
                              userID,
                              positionRecord.symbol,
                              positionRecord.long,
                              positionRecord.currentPrice,
                              positionRecord.quantity,
                              currentAccount
                            ),
                        },
                      ],
                    });
                  }}
                >
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
                <tr
                  className="position-bottom-row"
                  onClick={() => {
                    ionAlert({
                      header: "平倉離場?",
                      buttons: [
                        { text: "取消", role: "dismiss" },
                        {
                          text: "確認",
                          role: "confirm",
                          handler: () =>
                            closePosition(
                              positionRecord.id,
                              userID,
                              positionRecord.symbol,
                              positionRecord.long,
                              positionRecord.currentPrice,
                              positionRecord.quantity,
                              currentAccount
                            ),
                        },
                      ],
                    });
                  }}
                >
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
              </React.Fragment>
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
