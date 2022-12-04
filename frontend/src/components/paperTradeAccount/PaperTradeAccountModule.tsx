import React from "react";
import { useHistory } from "react-router";
import "./PaperTradeAccountModule.css";

interface PaperTradeAccountModuleProps {
  region: string;
  amount: number;
  profit: number;
  profitPercentage: number;

}

const PaperTradeAccountModule: React.FC<PaperTradeAccountModuleProps> = ({
  region,
  amount,
  profit,
  profitPercentage,
}) => {
  const history = useHistory();

  return (
    <>
      <div className="modules-container">
        <div
          className="module"
          onClick={() => history.push(`/individualAccount/${region}`)}
        >
          <div className="top-row">
            <div className="title-icon-container">
              <div className="icon-container">Icon</div>
              <div className="title-container">
                {region === "US" && "美股模擬賬戶"}
                {region === "HK" && "港股模擬賬戶"}
                {region === "crypto" && "加密貨幣模擬賬戶"}
              </div>
            </div>
            <div className="gray">今日盈虧</div>
          </div>
          <div className="bottom-row">
            <div className="account-amount">{amount.toFixed(2)}</div>
            <div className="today-profit-container">
              <div className="profit gray">{profit.toFixed(2)}</div>
              <div className="profit-percentage gray">
                {profitPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaperTradeAccountModule;
