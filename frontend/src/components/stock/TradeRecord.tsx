import React from "react";
import "src/components/stock/TradeRecord.css";

interface TradeRecordProps {
  stockID: number;
  long: boolean;
  orderPrice: number;
  quantity: number;
  orderPlaceTime: string;
  orderStatus: number;
  orderCompleteTime: string;
}

const TradeRecord: React.FC<TradeRecordProps> = ({
  stockID,
  long,
  orderPrice,
  quantity,
  orderPlaceTime,
  orderStatus,
  orderCompleteTime,
}) => {
  return (
    <>
      <div className="trade-record">
        <div className="traded-stock-name">{stockID}</div>
        <div className="trade-type">{long}</div>
        <div className="order-price">{orderPrice}</div>
        <div className="quantity">{quantity}</div>
        <div className="order-place-time">{orderPlaceTime}</div>
        <div className="order-status">{orderStatus}</div>
        <div className="order-complete-time">{orderCompleteTime}</div>
      </div>
    </>
  );
};

export default TradeRecord;
