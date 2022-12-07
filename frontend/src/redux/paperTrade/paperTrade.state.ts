export interface PaperTradeState {
  isUpdate: boolean;
  account: {
    user_id: number;
    market_value: number;
    buying_power: number;
    account: string;
  };
  positions: {
    id: number;
    symbol: string;
    long: boolean;
    name: string;
    chineseName: string;
    cost: number;
    marketValue: number;
    currentPrice: number;
    quantity: number;
    profit: number;
    profitPercentage: number;
    ratio: number;
    account: string;
  }[];
  trades: {
    id: number;
    symbol: string;
    name: string;
    chineseName: string;
    long: boolean;
    orderPrice: number;
    quantity: number;
    orderPlaceTime: string;
    orderStatus: number;
    orderCompleteTime: string;
    account: string;
  }[];
}

export const initPaperTrade: PaperTradeState = {
  isUpdate: false,
  account: {
    user_id: 1,
    market_value: 0,
    buying_power: 1000000,
    account: "US",
  },
  positions: [
    {
      id: 1,
      symbol: "TSLA",
      long: true,
      name: "Tesla",
      chineseName: "特斯拉 ",
      cost: 100,
      marketValue: 1000,
      currentPrice: 100,
      quantity: 10,
      profit: 0,
      profitPercentage: 0,
      ratio: 100,
      account: "US",
    },
  ],
  trades: [
    {
      id: 1,
      symbol: "TSLA",
      name: "Tesla",
      chineseName: "特斯拉",
      long: true,
      orderPrice: 100,
      quantity: 10,
      orderPlaceTime: "2022-12-01T18:16:32",
      orderStatus: 1,
      orderCompleteTime: "2022-12-01T18:16:32",
      account: "US",
    },
  ],
};
