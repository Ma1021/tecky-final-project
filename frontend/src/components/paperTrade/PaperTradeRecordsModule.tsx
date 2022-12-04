import React, { useEffect, useState } from "react";

interface OrderRecordsType {
  id: number;
  symbol: string;
  name: string;
  chinese_name: string;
  long: boolean;
  order_price: number;
  quantity: number;
  order_place_time: string;
  order_status: number;
  order_complete_time: string;
}

interface PaperTradeRecordsModuleProps {
  userID: string;
  currentAccount: string;
}

const PaperTradeRecordsModule: React.FC<PaperTradeRecordsModuleProps> = ({
  userID,
  currentAccount,
}) => {
  const [orderRecords, setOrderRecords] = useState<OrderRecordsType[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getFullOrderList?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setOrderRecords(result);
      });
  }, [currentAccount]);

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
                    (order.long === true ? "positive" : "negative")
                  }
                >
                  {order.long === true ? "模擬買入" : "模擬賣出"}
                </td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.order_place_time.split("T")[0]}</td>
              </tr>
              <tr className="order-bottom-row">
                <td
                  className={
                    "progress-order-stock-symbol " +
                    (order.order_status === 0
                      ? "pending"
                      : order.order_status === 1
                      ? "positive"
                      : "negative")
                  }
                >
                  {order.order_status === 0
                    ? "等待成交"
                    : order.order_status === 1
                    ? "已成交"
                    : "訂單取消"}
                </td>
                <td>{order.symbol}</td>
                <td>{order.order_price}</td>
                <td>{order.order_place_time.split("T")[1]}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PaperTradeRecordsModule;
