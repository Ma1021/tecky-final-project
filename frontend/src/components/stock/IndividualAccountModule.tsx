import React, { useEffect, useState } from "react";
import AccountOverviewModule from "./AccountOverviewModule";

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
  }, []);

  return (
    <>
      <h1>{category}</h1>
      <AccountOverviewModule
        category={category}
        accountDetail={accountDetail}
      />
    </>
  );
};

export default IndividualAccountModule;
