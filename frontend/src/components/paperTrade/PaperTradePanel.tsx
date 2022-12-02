import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./PaperTradePanel.css";
import MultipleSeriesChart from "../stock/MultipleSeriesChart";
import UserPortfolio from "../paperTradeAccount/UserPortfolio";
import TradeRecord from "../paperTradeAccount/TradeRecord";

interface UserTradeRecords {
  id: number;
  user_id: number;
  stock_id: number;
  // stockName: string;
  // stockChineseName: string;
  stock_price: number;
  long: boolean;
  order_price: number;
  quantity: number;
  place_order_time: string;
  order_status: number;
  complete_time: string;
}

const PaperTradePanel: React.FC = () => {
  const location = useLocation();
  const symbol =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const userID = 1;
  const [userTradeRecords, setUserTradeRecords] = useState<UserTradeRecords[]>(
    []
  );

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/stock/getUserTradeRecords?userID=${userID}`
    )
      .then((res) => res.json())
      .then((result) => setUserTradeRecords(result));
  }, []);

  return (
    <>
      <div className="container">
        <h1>Paper Trade</h1>
        <MultipleSeriesChart symbol={symbol!} />
        <div className="trading-info-container">
          <div className="portfolio-container">
            <h3>Portfolio</h3>
            <UserPortfolio symbol={symbol!} />
          </div>
          <div className="trading-history">
            {userTradeRecords.map((record) => (
              <TradeRecord
                key={record.id}
                stockID={record.stock_id}
                long={record.long}
                orderPrice={record.order_price}
                quantity={record.quantity}
                orderPlaceTime={record.place_order_time}
                orderStatus={record.order_status}
                orderCompleteTime={record.complete_time}
              />
            ))}
          </div>
          <div className="trading-panel-container">
            <div className="trading-panel-row">
              <div className="stock-info-container">Stock Info</div>
              <div className="ask-bid-container">Ask-Bid</div>
            </div>
            <div className="trading-panel-row">
              <button className="long">Long</button>
              <button className="short">Short</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaperTradePanel;
