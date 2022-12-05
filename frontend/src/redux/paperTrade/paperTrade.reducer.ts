import { PaperTradeActionType } from "./paperTrade.action";
import { initPaperTrade, PaperTradeState } from "./paperTrade.state";

export function paperTradeReducer(
  oldState: PaperTradeState = initPaperTrade,
  action: PaperTradeActionType
) {
  switch (action.type) {
    case "PAPER_TRADE_UPDATE":
      return { ...oldState, isUpdate: !oldState.isUpdate };
    default:
      return oldState;
  }
}
