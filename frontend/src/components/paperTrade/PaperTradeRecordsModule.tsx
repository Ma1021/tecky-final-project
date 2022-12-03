import React, { useEffect, useState } from "react";

interface OrderRecordsType {
  orderType: number;
  name: string;
  quantity: number;
  orderPlaceTime: string;
  status: number;
  symbol: string;
  price: number;
}

const PaperTradeRecordsModule: React.FC = () => {
  const [orderRecords, setOrderRecords] = useState<OrderRecordsType[]>([]);

  useEffect(() => {
    setOrderRecords([
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
      {
        orderType: 0,
        status: 1,
        name: "小鵬汽車",
        symbol: "XPEV",
        quantity: 1,
        price: 12.05,
        orderPlaceTime: "2022-12-02 19:00:05",
      },
      {
        orderType: 1,
        status: 2,
        name: "小鵬汽車",
        symbol: "XPEV",
        quantity: 1,
        price: 20.5,
        orderPlaceTime: "2022-11-30 18:30:02",
      },
    ]);
  }, []);

  return (
    <>
      <table className="order-table">
        <tbody>
          <tr>
            <th className="order-table-column-name">訂單狀態</th>
            <th className="order-table-column-name">名稱代碼</th>
            <th className="order-table-column-name">數量/價格</th>
            <th className="order-table-column-name">下單時間</th>
          </tr>
          {orderRecords.map((order) => (
            <>
              <tr>
                <td
                  className={
                    "progress-order-order-type " +
                    (order.orderType === 0 ? "positive" : "negative")
                  }
                >
                  {order.orderType === 0 ? "模擬買入" : "模擬賣出"}
                </td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.orderPlaceTime.split(" ")[0]}</td>
              </tr>
              <tr className="order-bottom-row">
                <td
                  className={
                    "progress-order-stock-symbol " +
                    (order.status === 0
                      ? "pending"
                      : order.status === 1
                      ? "positive"
                      : "negative")
                  }
                >
                  {order.status === 0
                    ? "等待成交"
                    : order.status === 1
                    ? "已成交"
                    : "訂單取消"}
                </td>
                <td>{order.symbol}</td>
                <td>{order.price}</td>
                <td>{order.orderPlaceTime.split(" ")[1]}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PaperTradeRecordsModule;
