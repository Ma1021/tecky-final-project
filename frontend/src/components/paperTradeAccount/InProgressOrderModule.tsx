import { useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import "./InProgressOrderModule.css";

export interface InProgressOrderType {
  id: number;
  symbol: string;
  name: string;
  chinese_name: string;
  long: boolean;
  order_price: number;
  quantity: number;
  order_place_time: string;
  order_status: number;
}

interface InProgressOrderModuleProps {
  currentAccount: string;
}

const InProgressOrderModule: React.FC<InProgressOrderModuleProps> = ({
  currentAccount,
}) => {
  const [inProgressOrderList, setInProgressOrderList] = useState<
    InProgressOrderType[]
  >([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [ionAlert] = useIonAlert();
  const userID = useAppSelector((state) => state.auth.user!.id);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getInProgressOrderList?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        setInProgressOrderList(result);
      });
  }, [currentAccount, isUpdate]);

  async function cancelOrder(orderID: number, userID: number, account: string) {
    const data = { orderID, userID, account };
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/cancelOrder`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    setIsUpdate(!isUpdate);
  }

  return (
    <>
      {inProgressOrderList.length > 0 ? (
        <table className="order-table">
          <tbody>
            <tr>
              <th className="order-table-column-name">訂單狀態</th>
              <th className="order-table-column-name">名稱代碼</th>
              <th className="order-table-column-name">數量/價格</th>
              <th className="order-table-column-name">下單時間</th>
            </tr>
            {inProgressOrderList.map((inProgressOrder) => (
              <React.Fragment key={inProgressOrder.id}>
                <tr
                  className="order-upper-row"
                  onClick={() => {
                    ionAlert({
                      header: "取消訂單?",
                      buttons: [
                        { text: "取消", role: "dismiss" },
                        {
                          text: "確認",
                          role: "confirm",
                          handler: () =>
                            cancelOrder(
                              inProgressOrder.id,
                              userID,
                              currentAccount
                            ),
                        },
                      ],
                    });
                  }}
                >
                  <td
                    className={
                      "order-order-type " +
                      (inProgressOrder.long === true ? "positive" : "negative")
                    }
                  >
                    {inProgressOrder.long === true ? "模擬買入" : "模擬賣出"}
                  </td>
                  <td>{inProgressOrder.chinese_name}</td>
                  <td>{inProgressOrder.quantity}</td>
                  <td>{inProgressOrder.order_place_time.split("T")[0]}</td>
                </tr>
                <tr
                  className="order-bottom-row"
                  onClick={() => {
                    ionAlert({
                      header: "取消訂單?",
                      buttons: [
                        { text: "取消", role: "dismiss" },
                        {
                          text: "確認",
                          role: "confirm",
                          handler: () =>
                            cancelOrder(
                              inProgressOrder.id,
                              userID,
                              currentAccount
                            ),
                        },
                      ],
                    });
                  }}
                >
                  <td
                    className={
                      "order-stock-symbol " +
                      (inProgressOrder.order_status === 0
                        ? "pending"
                        : inProgressOrder.order_status === 1
                        ? "positive"
                        : "negative")
                    }
                  >
                    {inProgressOrder.order_status === 0
                      ? "等待成交"
                      : inProgressOrder.order_status === 1
                      ? "已成交"
                      : "訂單取消"}
                  </td>
                  <td>{inProgressOrder.symbol}</td>
                  <td>{inProgressOrder.order_price}</td>
                  <td>{inProgressOrder.order_place_time.split("T")[1]}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div>暫無訂單</div>
      )}
    </>
  );
};

export default InProgressOrderModule;
