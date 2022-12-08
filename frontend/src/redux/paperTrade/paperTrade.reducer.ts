import { PaperTradeActionType } from "./paperTrade.action";
import { initPaperTrade, PaperTradeState } from "./paperTrade.state";

export function paperTradeReducer(
  oldState: PaperTradeState = initPaperTrade,
  action: PaperTradeActionType
) {
  switch (action.type) {
    case "PAPER_TRADE_UPDATE":
      return { ...oldState, isUpdate: !oldState.isUpdate };
    // case "PLACE_ORDER":
    //   const { name, chinese_name } = getStockNameFromDB(action.symbol);

    //   return {
    //     ...oldState,
    //     trades: [
    //       ...oldState.trades,
    //       {
    //         id: 1,
    //         symbol: action.symbol,
    //         name: name,
    //         chineseName: chinese_name,
    //         long: true,
    //         orderPrice: 100,
    //         quantity: 10,
    //         orderPlaceTime:
    //           new Date().toDateString() + "T" + new Date().toTimeString(),
    //         orderStatus: 1,
    //         orderCompleteTime:
    //           new Date().toDateString() + "T" + new Date().toTimeString(),
    //         account: "US",
    //       },
    //     ],
    //   };
    case "LOADING":
      return {
        ...oldState,
        isLoading: !action.isLoading,
      };
    default:
      return oldState;
  }
}

// async function getStockNameFromDB(symbol: string) {
//   const res = await fetch(
//     `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getStockName?symbol=${symbol}`
//   );
//   const result = await res.json();
//   return result[0];
// }
