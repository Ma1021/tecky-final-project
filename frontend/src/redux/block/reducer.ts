import { BlockActions } from "./actions";
import { BlockListState, initialState } from "./state";

export function blockReducer(
  state: BlockListState = initialState,
  action: BlockActions
): BlockListState {
  switch (action.type) {
    case "@@block/UPDATE_BLOCK":
      return {
        ...state,
        blockedUserList: action.blockedUserList,
      };
    case "@@block/UPDATE_BLOCK_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
