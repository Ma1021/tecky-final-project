import { ChatroomAddActions } from "./actions";
import { ChatroomAddState, initialChatroomAddState } from "./state";

export function chatroomAddReducer(
  state: ChatroomAddState = initialChatroomAddState,
  action: ChatroomAddActions
): ChatroomAddState {
  switch (action.type) {
    case "@@chatroom/LOAD_CHATROOMS_ALL":
      return {
        ...state,
        chatInfo: action.chatInfo,
      };
    case "@@chatroom/LOAD_CHATROOMS_ALL_START":
      return {
        ...state,
        loading: true,
      };
    case "@@chatroom/LOAD_CHATROOMS_ALL_END":
      return {
        ...state,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_ALL_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_RECOMMEND":
      return {
        ...state,
        chatInfo: action.chatInfo,
      };
    case "@@chatroom/LOAD_CHATROOMS_RECOMMEND_START":
      return {
        ...state,
        loading: true,
      };
    case "@@chatroom/LOAD_CHATROOMS_RECOMMEND_END":
      return {
        ...state,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_RECOMMEND_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
