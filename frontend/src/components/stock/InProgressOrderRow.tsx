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
      <div className="progress-order-top-row">
        <div className="progress-order-row-left-container">
          <span className="progress-order-order-type">
            {orderType === 0 ? "模擬買入" : "模擬賣出"}
          </span>
        </div>
        <div className="progress-order-row-right-container">
          <span className="progress-order-name">{name}</span>
          <span className="progress-order-quantity">{quantity}</span>
          <span className={"progress-order-date"}>
            {orderPlaceTime.split(" ")[0]}
          </span>
        </div>
      </div>
      <div className="progress-order-bottom-row">
        <div className="progress-order-row-left-container">
          <span className="progress-order-stock-symbol">
            {status === 0 ? "等待成交" : status === 1 ? "已成交" : "訂單取消"}
          </span>
        </div>
        <div className="progress-order-row-right-container">
          <span className="progress-order-symbol">{symbol}</span>
          <span className="progress-order-stock-cost">{price}</span>
          <span className="progress-order-time">
            {orderPlaceTime.split(" ")[1]}
          </span>
        </div>
      </div>
    </>
  );
};

export default InProgressOrderRow;
