import { AppDispatch } from "../store";
import { ChatroomRecord } from "./state";

// get all chatroom
export function loadChatroomsRecord(chatRecord: ChatroomRecord[]) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_RECORD" as const,
    chatRecord: chatRecord,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECORD" as const,
    chatRecord: chatRecord,
  };
}

export function loadChatroomsRecordStart() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_RECORD_START" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECORD_START" as const,
  };
}

export function loadChatroomsRecordEnd() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_RECORD_END" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECORD_END" as const,
  };
}

export function loadChatroomsRecordError(error: {
  statusCode: number;
  message: string;
}) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_RECORD_ERROR" as const,
    error: error,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECORD_ERROR" as const,
    error: error,
  };
}

// fetch all chatroom here
export function fetchChatroomsRecord(userId: number, roomId: number) {
  return (dispatch: AppDispatch) => {
    // side effects welcome
    console.log(roomId);
    dispatch(loadChatroomsRecordStart());
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/${+roomId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, chatroomId: roomId }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(loadChatroomsRecord(data));
          dispatch(loadChatroomsRecordEnd());
        });
        // .catch((error) => {
        //   dispatch(loadChatroomsRecordError(error.message));
        // });
      } else {
        res.json().then((error) => dispatch(loadChatroomsRecordError(error)));
      }
    });
  };
}

export type ChatroomRecordActions =
  | ReturnType<typeof loadChatroomsRecord>
  | ReturnType<typeof loadChatroomsRecordStart>
  | ReturnType<typeof loadChatroomsRecordEnd>
  | ReturnType<typeof loadChatroomsRecordError>;
