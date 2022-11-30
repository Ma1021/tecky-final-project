import { AppDispatch } from "../store";
import { ChatroomList } from "./state";

// get all chatroom
export function loadChatroomsEntered(chatroomInfo: ChatroomList[]) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED" as const,
    chatroomInfo: chatroomInfo,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED" as const,
    chatroomInfo: chatroomInfo,
  };
}

export function loadChatroomsEnteredStart() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED_START" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED_START" as const,
  };
}

export function loadChatroomsEnteredEnd() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED_END" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED_END" as const,
  };
}

export function loadChatroomsEnteredError(error: string) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED_ERROR" as const,
    error: error,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ENTERED_ERROR" as const,
    error: error,
  };
}

// fetch all chatroom here
export function fetchChatroomsEntered(id: number) {
  return (dispatch: AppDispatch) => {
    // side effects welcome
    dispatch(loadChatroomsEnteredStart());
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/entered`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadChatroomsEntered(data));
        console.log("host ented", data);
        dispatch(loadChatroomsEnteredEnd());
      })
      .catch((error) => {
        dispatch(loadChatroomsEnteredError(error.message));
      });
  };
}
// get recommend chatroom
export function loadChatroomsHost(chatroomInfo: ChatroomList[]) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_HOST" as const,
    chatroomInfo,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_HOST" as const,
    chatroomInfo,
  };
}

export function loadChatroomsHostStart() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_HOST_START" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_HOST_START" as const,
  };
}

export function loadChatroomsHostEnd() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_HOST_END" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_HOST_END" as const,
  };
}

export function loadChatroomsHostError(error: string) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_HOST_ERROR" as const,
    error: error,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_HOST_ERROR" as const,
    error: error,
  };
}

// fetch recommend chatroom here
export function fetchChatroomsHost(id: number) {
  return (dispatch: AppDispatch) => {
    // side effects welcome
    dispatch(loadChatroomsHostStart());
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/host`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadChatroomsHost(data));
        console.log("host data", data);
        dispatch(loadChatroomsHostEnd());
      })
      .catch((error) => {
        dispatch(loadChatroomsHostError(error.message));
      });
  };
}

export type ChatroomListActions =
  | ReturnType<typeof loadChatroomsEntered>
  | ReturnType<typeof loadChatroomsEnteredStart>
  | ReturnType<typeof loadChatroomsEnteredEnd>
  | ReturnType<typeof loadChatroomsEnteredError>
  | ReturnType<typeof loadChatroomsHost>
  | ReturnType<typeof loadChatroomsHostStart>
  | ReturnType<typeof loadChatroomsHostEnd>
  | ReturnType<typeof loadChatroomsHostError>;
