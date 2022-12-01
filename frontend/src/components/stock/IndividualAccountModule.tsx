import React, { useEffect, useState } from "react";
import AccountOverviewModule from "./AccountOverviewModule";
import UserPositionModule from "./UserPositionModule";

interface IndividualAccountModuleProps {
  category: string;
}

export interface AccountDetailType {
  totalAmount: number;
  todayProfit: number;
  todayProfitPercentage: number;
  marketValue: number;
  rank: number;
  buyingPower: number;
  totalProfit: number;
  totalProfitPercentage: number;
}

const IndividualAccountModule: React.FC<IndividualAccountModuleProps> = ({
  category,
}) => {
  const [accountDetail, setAccountDetail] = useState<AccountDetailType>({
    totalAmount: 0,
    todayProfit: 0,
    todayProfitPercentage: 0,
    marketValue: 0,
    buyingPower: 0,
    rank: 0,
    totalProfit: 0,
    totalProfitPercentage: 0,
  });

  useEffect(() => {
    if (category === "US") {
      setAccountDetail({
        totalAmount: 1000000,
        todayProfit: 0,
        todayProfitPercentage: 0,
        marketValue: 0,
        buyingPower: 1000000,
        rank: 0,
        totalProfit: 0,
        totalProfitPercentage: 0,
      });
    } else if (category === "HK") {
      setAccountDetail({
        totalAmount: 2000000,
        todayProfit: 1000,
        todayProfitPercentage: 10,
        marketValue: 1000000,
        buyingPower: 1000000,
        rank: 1,
        totalProfit: 1000000,
        totalProfitPercentage: 100,
      });
    } else {
      setAccountDetail({
        totalAmount: 10000,
        todayProfit: -8000,
        todayProfitPercentage: -80,
        marketValue: 10000,
        buyingPower: 0,
        rank: 9999,
        totalProfit: -9000,
        totalProfitPercentage: -90,
      });
    }
  }, [category]);

  return (
    <>
      <AccountOverviewModule accountDetail={accountDetail} />
      <div style={{ height: "10px" }}></div>
      <UserPositionModule />
    </>
  );
};

export default IndividualAccountModule;
