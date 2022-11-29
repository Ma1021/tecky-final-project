import { ChatroomRecordActions } from "./actions";
import { ChatroomRecordState, initialChatroomRecordState } from "./state";

export function chatroomRecordReducer(
  state: ChatroomRecordState = initialChatroomRecordState,
  action: ChatroomRecordActions
): ChatroomRecordState {
  switch (action.type) {
    case "@@chatroom/LOAD_CHATROOMS_RECORD":
      if (
        JSON.stringify(state.chatRecord) === JSON.stringify(action.chatRecord)
      )
        return { ...state };
      return {
        ...state,
        chatRecord: [...state.chatRecord, ...action.chatRecord],
      };
    case "@@chatroom/LOAD_CHATROOMS_RECORD_START":
      return {
        ...state,
        loading: true,
      };
    case "@@chatroom/LOAD_CHATROOMS_RECORD_END":
      return {
        ...state,
        loading: false,
      };
    case "@@chatroom/LOAD_CHATROOMS_RECORD_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
