import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./PaperTradeAccountModule.css";

interface UserAccountType {
  region: string;
  amount: number;
  profit: number;
  profitPercentage: number;
}

interface PaperTradeAccountModuleProps {
  filter: string;
}

const PaperTradeAccountModule: React.FC<PaperTradeAccountModuleProps> = ({
  filter,
}) => {
  const [userAccountList, setUserAccountList] = useState<UserAccountType[]>([]);
  const history = useHistory();

  useEffect(() => {
    const exampleList = [
      { region: "us", amount: 185307.25, profit: 0, profitPercentage: 0 },
      { region: "hk", amount: 100100, profit: 100, profitPercentage: 0.1 },
      {
        region: "crypto",
        amount: 1110000,
        profit: 10000,
        profitPercentage: 100,
      },
    ];

    filter === "stock"
      ? setUserAccountList(exampleList.filter((obj) => obj.region !== "crypto"))
      : setUserAccountList(
          exampleList.filter((obj) => obj.region === "crypto")
        );
  }, [filter]);

  // fetch database to get user profit, amount, trade history
  //   useEffect(() => {}, []);

  return (
    <>
      <div className="modules-container">
        {userAccountList.map((obj) => (
          <div
            className="module"
            onClick={() => history.push("/individualAccount")}
          >
            <div className="top-row">
              <div className="title-icon-container">
                <div className="icon-container">Icon</div>
                <div className="title-container">
                  {obj.region === "us" && "美股模擬賬戶"}
                  {obj.region === "hk" && "港股模擬賬戶"}
                  {obj.region === "crypto" && "加密貨幣模擬賬戶"}
                </div>
              </div>
              <div className="today">今日盈虧</div>
            </div>
            <div className="bottom-row">
              <div className="account-amount">{obj.amount.toFixed(2)}</div>
              <div className="today-profit">
                <div className="profit today">{obj.profit.toFixed(2)}</div>
                <div className="profit-percentage today">
                  {obj.profitPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaperTradeAccountModule;
