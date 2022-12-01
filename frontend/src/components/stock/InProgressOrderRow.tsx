import React from "react";
import { InProgressOrderType } from "./InProgressOrderModule";
import "./InProgressOrderRow.css";

const InProgressOrderRow: React.FC<InProgressOrderType> = ({
  orderType,
  status,
  name,
  symbol,
  quantity,
  price,
  orderPlaceTime,
}) => {
  return (
    <>
      <div className="progress-order-row-container">
        <div className="progress-order-first-column">
          <div
            className={
              "progress-order-order-type " +
              (orderType === 0 ? "positive" : "negative")
            }
          >
            {orderType === 0 ? "模擬買入" : "模擬賣出"}
          </div>
          <div
            className={
              "progress-order-stock-symbol " +
              (status === 0
                ? "pending"
                : status === 1
                ? "positive"
                : "negative")
            }
          >
            {status === 0 ? "等待成交" : status === 1 ? "已成交" : "訂單取消"}
          </div>
        </div>

        <div className="progress-order-second-column">
          <div className="progress-order-name">{name}</div>
          <div className="progress-order-symbol">{symbol}</div>
        </div>

        <div className="progress-order-third-column">
          <div className="progress-order-quantity">{quantity}</div>
          <div className="progress-order-stock-cost">{price}</div>
        </div>
        
        <div className="progress-order-fourth-column">
          <div className={"progress-order-date"}>
            {orderPlaceTime.split(" ")[0]}
          </div>
          <div className="progress-order-time">
            {orderPlaceTime.split(" ")[1]}
          </div>
        </div>
      </div>
    </>
  );
};

export default InProgressOrderRow;
