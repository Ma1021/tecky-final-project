import React from "react";
import { useHistory } from "react-router";
import "./PaperTradeAccountModule.css";

interface PaperTradeAccountModuleProps {
  account: string;
  principal: number;
  totalProfit: number;
  totalProfitPercentage: number;
}

const PaperTradeAccountModule: React.FC<PaperTradeAccountModuleProps> = ({
  account,
  principal,
  totalProfit,
  totalProfitPercentage,
}) => {
  const history = useHistory();

  return (
    <>
      <div className="modules-container">
        <div
          className="module"
          onClick={() => history.push(`/individualAccount/${account}`)}
        >
          <div className="top-row">
            <div className="title-icon-container">
              <div className="title-container">
                {account === "US" && "美股模擬賬戶"}
                {account === "HK" && "港股模擬賬戶"}
                {account === "crypto" && "加密貨幣模擬賬戶"}
              </div>
            </div>
            <div className="gray">盈虧</div>
          </div>
          <div className="bottom-row">
            <div className="account-amount">{principal.toFixed(2)}</div>
            <div className="profit-container">
              <div
                className={
                  "profit " +
                  (totalProfit === 0
                    ? "gray"
                    : totalProfit > 0
                    ? "positive"
                    : "negative")
                }
              >
                {totalProfit.toFixed(2)}
              </div>
              <div
                className={
                  "profit-percentage " +
                  (totalProfit === 0
                    ? "gray"
                    : totalProfit > 0
                    ? "positive"
                    : "negative")
                }
              >
                {totalProfitPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaperTradeAccountModule;
