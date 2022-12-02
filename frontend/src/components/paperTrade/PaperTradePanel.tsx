import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./PaperTradePanel.css";
import MultipleSeriesChart from "../stock/MultipleSeriesChart";

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

const PaperTradeModule: React.FC = () => {
  const location = useLocation();
  const symbol =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <>
      <div className="container">
        <h1>Paper Trade</h1>
        <MultipleSeriesChart symbol={symbol!} />
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
    </>
  );
};

export default PaperTradeModule;
