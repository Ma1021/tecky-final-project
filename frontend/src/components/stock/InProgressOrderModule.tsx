import React, { useEffect, useState } from "react";
import InProgressOrderRow from "./InProgressOrderRow";
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
      <div className="progress-order-module-container">
        <div className="column-name-row">
          <div className="left-column-name">
            <span className="column-name">訂單狀態</span>
          </div>
          <div className="right-column-names">
            <span className="column-name">名稱代碼</span>
            <span className="column-name">數量/價格</span>
            <span className="column-name">下單時間</span>
          </div>
        </div>

        <div className="progress-order-list-container">
          {inProgressOrderList.length > 0 ? (
            inProgressOrderList.map((inProgressOrder) => (
              <InProgressOrderRow
                orderType={inProgressOrder.orderType}
                status={inProgressOrder.status}
                name={inProgressOrder.name}
                symbol={inProgressOrder.symbol}
                quantity={inProgressOrder.quantity}
                price={inProgressOrder.price}
                orderPlaceTime={inProgressOrder.orderPlaceTime}
              />
            ))
          ) : (
            <div>暫無訂單</div>
          )}
        </div>
      </div>
    </>
  );
};

export default InProgressOrderModule;
