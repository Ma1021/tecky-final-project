export function paperTradeUpdate(isUpdate: boolean) {
  return {
    type: "PAPER_TRADE_UPDATE" as const,
    isUpdate,
  };
}

export function placeOrder(
  userID: number,
  symbol: string,
  orderType: string,
  price: number,
  quantity: number,
  account: string
) {
  return {
    type: "PLACE_ORDER" as const,
    userID,
    symbol,
    orderType,
    price,
    quantity,
    account,
  };
}

export type PaperTradeActionType =
  | ReturnType<typeof paperTradeUpdate>
  | ReturnType<typeof placeOrder>;
