import { IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";

interface OrderRecordsType {
  id: number;
  symbol: string;
  name: string;
  chinese_name: string;
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
  const [isLoading, setIsLoading] = useState(true);

  // new 1 table approach
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getFullOrderList2?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        setOrderRecords(result.trades);
        setIsLoading(false);
      });
  }, [currentAccount]);

  return isLoading ? (
    <IonLoading isOpen={isLoading} message={"載入中..."} />
  ) : (
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
            <React.Fragment key={order.id}>
              <tr>
                <td
                  className={
                    "progress-order-order-type " +
                    (order.quantity > 0 ? "positive" : "negative")
                  }
                >
                  {order.quantity > 0 ? "模擬買入" : "模擬賣出"}
                </td>
                <td>{order.name}</td>
                <td>{order.quantity > 0 ? order.quantity : -order.quantity}</td>
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
                <td>{order.order_place_time.split("T")[1].slice(0, 8)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PaperTradeRecordsModule;
