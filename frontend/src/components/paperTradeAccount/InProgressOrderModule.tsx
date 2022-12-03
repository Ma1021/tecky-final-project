import React, { useEffect, useState } from "react";
import "./InProgressOrderModule.css";

export interface InProgressOrderType {
  orderType: number;
  status: number;
  name: string;
  symbol: string;
  quantity: number;
  price: number;
  orderPlaceTime: string;
}

const InProgressOrderModule: React.FC = () => {
  const [inProgressOrderList, setInProgressOrderList] = useState<
    InProgressOrderType[]
  >([]);

  useEffect(() => {
    setInProgressOrderList([
      {
        orderType: 0,
        status: 0,
        name: "小鵬汽車",
        symbol: "XPEV",
        quantity: 1,
        price: 10.81,
        orderPlaceTime: "2022-12-01 18:39:32",
      },
      {
        orderType: 1,
        status: 0,
        name: "小鵬汽車",
        symbol: "XPEV",
        quantity: 1,
        price: 10.81,
        orderPlaceTime: "2022-12-01 18:39:32",
      },
    ]);
  }, []);

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
              <>
                <tr>
                  <td
                    className={
                      "order-order-type " +
                      (inProgressOrder.orderType === 0
                        ? "positive"
                        : "negative")
                    }
                  >
                    {inProgressOrder.orderType === 0 ? "模擬買入" : "模擬賣出"}
                  </td>
                  <td>{inProgressOrder.name}</td>
                  <td>{inProgressOrder.quantity}</td>
                  <td>{inProgressOrder.orderPlaceTime.split(" ")[0]}</td>
                </tr>
                <tr className="order-bottom-row">
                  <td
                    className={
                      "order-stock-symbol " +
                      (inProgressOrder.status === 0
                        ? "pending"
                        : inProgressOrder.status === 1
                        ? "positive"
                        : "negative")
                    }
                  >
                    {inProgressOrder.status === 0
                      ? "等待成交"
                      : inProgressOrder.status === 1
                      ? "已成交"
                      : "訂單取消"}
                  </td>
                  <td>{inProgressOrder.symbol}</td>
                  <td>{inProgressOrder.price}</td>
                  <td>{inProgressOrder.orderPlaceTime.split(" ")[1]}</td>
                </tr>
              </>
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
