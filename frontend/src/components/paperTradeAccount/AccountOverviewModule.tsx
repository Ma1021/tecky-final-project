import React from "react";
import { AccountDetailType } from "../../pages/paperTrade/IndividualAccount";
import "./AccountOverviewModule.css";

interface AccountOverviewModuleProps {
  accountDetail: AccountDetailType;
}

const AccountOverviewModule: React.FC<AccountOverviewModuleProps> = ({
  accountDetail,
}) => {
  return (
    <>
      <div className="account-overview-module-container">
        <div className="first-row">
          <span className="gray">資產凈值</span>
        </div>

        <div className="second-row">
          <span className="total-amount">
            {accountDetail.principal.toFixed(2)}
          </span>
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
        </div>

        <div className="fourth-row">
          <div className="total-profit-percentage-container">
            <span className="gray">總收益率</span>
            <span
              className={
                accountDetail.totalProfitPercentage === 0
                  ? "gray"
                  : accountDetail.totalProfitPercentage > 0
                  ? "positive"
                  : "negative"
              }
            >
              {accountDetail.totalProfitPercentage.toFixed(2)}%
            </span>
          </div>
          <div className="total-profit-container">
            <span className="gray">總盈虧金額</span>
            <span
              className={
                accountDetail.totalProfit === 0
                  ? "gray"
                  : accountDetail.totalProfit > 0
                  ? "positive"
                  : "negative"
              }
            >
              {accountDetail.totalProfit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountOverviewModule;
