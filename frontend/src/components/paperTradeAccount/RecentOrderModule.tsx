import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import "./RecentOrderModule.css";

export interface RecentOrderType {
  id: number;
  symbol: string;
  name: string;
  chineseName: string;
  long: boolean;
  orderPrice: number;
  quantity: number;
  orderPlaceTime: string;
  orderStatus: number;
}

interface RecentOrderModuleProps {
  currentAccount: string;
}

const RecentOrderModule: React.FC<RecentOrderModuleProps> = ({
  currentAccount,
}) => {
  const [RecentOrderList, setRecentOrderList] = useState<RecentOrderType[]>([]);
  // const recentOrderList = useAppSelector((state) => state.paperTrade.trades);
  const isUpdate = useAppSelector((state) => state.paperTrade.isUpdate);
  const userID = 1;

  // new 1 table approach
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getFullOrderList2?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        const newResult = result.trades.slice(0, 6).map((obj: any) => {
          return {
            id: obj.id,
            symbol: obj.symbol,
            name: obj.name,
            chineseName: obj.chinese_name,
            orderPrice: obj.order_price,
            quantity: obj.quantity,
            orderPlaceTime: obj.order_place_time,
            orderStatus: obj.order_status,
          };
        });
        setRecentOrderList(newResult);
      });
  }, [currentAccount, isUpdate]);

  // redux approach
  // useEffect(() => {
  //   recentOrderList.map(() => {});
  //   setInProgressOrderList(recentOrderList);
  // }, [recentOrderList, isUpdate]);

  return (
    <>
      {RecentOrderList.length > 0 ? (
        <table className="order-table">
          <tbody>
            <tr>
              <th className="order-table-column-name">訂單狀態</th>
              <th className="order-table-column-name">名稱代碼</th>
              <th className="order-table-column-name">數量/價格</th>
              <th className="order-table-column-name">下單時間</th>
            </tr>
            {RecentOrderList.map((recentOrder) => (
              <React.Fragment key={recentOrder.id}>
                <tr className="order-upper-row">
                  <td
                    className={
                      "order-order-type " +
                      (recentOrder.quantity > 0 ? "positive" : "negative")
                    }
                  >
                    {recentOrder.quantity > 0 ? "模擬買入" : "模擬賣出"}
                  </td>
                  <td>{recentOrder.chineseName}</td>
                  <td>
                    {recentOrder.quantity > 0
                      ? recentOrder.quantity
                      : -recentOrder.quantity}
                  </td>
                  <td>{recentOrder.orderPlaceTime.split("T")[0]}</td>
                </tr>
                <tr className="order-bottom-row">
                  <td
                    className={
                      "order-stock-symbol " +
                      (recentOrder.orderStatus === 0
                        ? "pending"
                        : recentOrder.orderStatus === 1
                        ? "positive"
                        : "negative")
                    }
                  >
                    {recentOrder.orderStatus === 0
                      ? "等待成交"
                      : recentOrder.orderStatus === 1
                      ? "已成交"
                      : "訂單取消"}
                  </td>
                  <td>{recentOrder.symbol}</td>
                  <td>{recentOrder.orderPrice}</td>
                  <td>
                    {recentOrder.orderPlaceTime.split("T")[1].slice(0, 8)}
                  </td>
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
