import { IonLoading, useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { paperTradeUpdate } from "../../redux/paperTrade/paperTrade.action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./PositionModule.css";

interface PositionRow {
  id: number;
  symbol: string;
  name: string;
  chineseName: string;
  currentMarketValue: number;
  currentPrice: number;
  cost: number;
  quantity: number;
  profit: number;
  profitPercentage: number;
  ratio: number;
}

interface PositionModuleProps {
  currentAccount: string;
}

const PositionModule: React.FC<PositionModuleProps> = ({ currentAccount }) => {
  const [userPosition, setUserPosition] = useState<PositionRow[]>([]);
  const [ionAlert] = useIonAlert();
  const isUpdate = useAppSelector((state) => state.paperTrade.isUpdate);
  const [isLoading, setIsLoading] = useState(true);
  const userID = useAppSelector((state) => state.auth.user!.id);
  const dispatch = useAppDispatch();

  // new 1 table approach
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getFullOrderList2?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.positions);

        setUserPosition(result.positions);
        setIsLoading(false);
      });
  }, [currentAccount, isUpdate]);

  async function closePosition(
    useID: number,
    symbol: string,
    orderDirection: boolean,
    price: number,
    quantity: number,
    account: string
  ) {
    const data = { userID, symbol, orderDirection, price, quantity, account };
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/placeOrder3`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    dispatch(paperTradeUpdate(isUpdate));
  }

  return isLoading ? (
    <IonLoading isOpen={isLoading} message={"載入中..."} />
  ) : (
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
                              userID,
                              positionRecord.symbol,
                              !(positionRecord.quantity > 0),
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
                  <td>{positionRecord.currentMarketValue.toFixed(2)}</td>
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
                              userID,
                              positionRecord.symbol,
                              !(positionRecord.quantity > 0),
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
