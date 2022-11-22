import { PageActionType } from "./page.action";
import { initPageState, PageStateType } from "./page.state";

export function pageReducer(
  oldState: PageStateType = initPageState,
  action: PageActionType
) {
  if (action.type === "CHANGE_PAGE") {
    return {
      ...oldState,
      stockList: action.pageState.stockList,
      stockInfo: action.pageState.stockInfo,
      stockForum: action.pageState.stockForum,
      stockNews: action.pageState.stockNews,
      stockAnalysis: action.pageState.stockAnalysis,
    };
  }
  return oldState;
}
