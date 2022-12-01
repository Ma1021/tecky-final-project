import React from "react";
import { AccountDetailType } from "./IndividualAccountModule";
import "./AccountOverviewModule.css";

interface AccountOverviewModuleProps {
  category: string;
  accountDetail: AccountDetailType;
}

const AccountOverviewModule: React.FC<AccountOverviewModuleProps> = ({
  category,
  accountDetail,
}) => {
  return (
    <>
      <div className="account-overview-module-container">
        <div className="first-row">
          <span className="gray">資產凈值</span>
          <span className="gray">今日盈虧</span>
        </div>

        <div className="second-row">
          <span className="total-amount">
            {accountDetail.totalAmount.toFixed(2)}
          </span>
          <div className="today-profit-container">
            <div className="today-profit gray">
              {accountDetail.todayProfit.toFixed(2)}
            </div>
            <div className="today-profit-percentage gray">
              {accountDetail.todayProfitPercentage.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="third-row">
          <div className="market-value-container">
            <span className="gray">證券市值</span>
            <span>{accountDetail.marketValue.toFixed(2)}</span>
          </div>
          <div className="buying-power-container">
            <span className="gray">可用資金</span>
            <span>{accountDetail.buyingPower.toFixed(2)}</span>
          </div>
          <div className="rank-container">
            <span className="gray">排行</span>
            <span>{accountDetail.rank === 0 ? "--" : accountDetail.rank}</span>
          </div>
        </div>

        <div className="fourth-row">
          <div className="total-profit-percentage-container">
            <span className="gray">總收益率</span>
            <span>{accountDetail.totalProfitPercentage.toFixed(2)}</span>
          </div>
          <div className="total-profit-container">
            <span className="gray">總盈虧金額</span>
            <span>{accountDetail.totalProfit.toFixed(2)}</span>
          </div>
          <div className="empty-container"></div>
        </div>
      </div>
    </>
  );
};

export default AccountOverviewModule;
