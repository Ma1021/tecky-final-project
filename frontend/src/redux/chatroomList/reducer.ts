import { ChatroomListActions } from "./actions";
import { ChatroomListState, initialChatroomListState } from "./state";

export function chatroomListReducer(
  state: ChatroomListState = initialChatroomListState,
  action: ChatroomListActions
): ChatroomListState {
  switch (action.type) {
    case "@@chatroom/LOAD_CHATROOMS_ENTERED":
      return {
        ...state,
        chatroomInfo: action.chatroomInfo,
      };
    case "@@chatroom/LOAD_CHATROOMS_ENTERED_START":
      return {
        ...state,
        loading: true,
      };
    case "@@chatroom/LOAD_CHATROOMS_ENTERED_END":
      return {
        ...state,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_ENTERED_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_HOST":
      return {
        ...state,
        chatroomInfo: action.chatroomInfo,
      };
    case "@@chatroom/LOAD_CHATROOMS_HOST_START":
      return {
        ...state,
        loading: true,
      };
    case "@@chatroom/LOAD_CHATROOMS_HOST_END":
      return {
        ...state,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_HOST_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
