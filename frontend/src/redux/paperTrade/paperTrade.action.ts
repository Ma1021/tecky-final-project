export function paperTradeUpdate(isUpdate: boolean) {
  return {
    type: "PAPER_TRADE_UPDATE" as const,
    isUpdate,
  };
}

export type PaperTradeActionType = ReturnType<typeof paperTradeUpdate>;
