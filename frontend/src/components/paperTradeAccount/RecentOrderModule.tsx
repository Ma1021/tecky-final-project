import React, { useEffect, useState } from "react";
import "./RecentOrderModule.css";

export interface RecentOrderType {
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

interface RecentOrderModuleProps {
  currentAccount: string;
}

const RecentOrderModule: React.FC<RecentOrderModuleProps> = ({
  currentAccount,
}) => {
  const [inProgressOrderList, setInProgressOrderList] = useState<
    RecentOrderType[]
  >([]);
  const userID = 1;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getRecentOrderList?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        setInProgressOrderList(result);
      });
  }, [currentAccount]);

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
                <tr className="order-upper-row">
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
                <tr className="order-bottom-row">
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

export default RecentOrderModule;
