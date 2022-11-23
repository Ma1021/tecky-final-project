import { ChatroomActions } from "./actions";
import { ChatroomListState, initialState } from "./state";

export function chatroomReducer(
  state: ChatroomListState = initialState,
  action: ChatroomActions
): ChatroomListState {
  switch (action.type) {
    case "@@chatroom/chatroomEntered":
      return {
        ...state,
      };
    case "@@chatroom/chatroomRecommend":
      return {
        ...state,
      };
    case "@@chatroom/chatroomAll":
      return {
        ...state,
      };
    default:
      return state;
  }
}
