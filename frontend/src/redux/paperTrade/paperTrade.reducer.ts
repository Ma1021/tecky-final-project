import { AccountActionType } from "./paperTrade.action";
import { AccountStateType, initAccountState } from "./paperTrade.state";

export function accountReducer(
  oldState: AccountStateType = initAccountState,
  action: AccountActionType
) {
  switch (action.type) {
    case "PLACE_ORDER":
      return {
        ...oldState,
      };
    case "CLOSE_POSITION":
      return {
        ...oldState,
      };
    default:
      return oldState;
  }
}
