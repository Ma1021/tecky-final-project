import { AppDispatch } from "../store";
import { ChatroomAdd } from "./state";

// get all chatroom
export function loadChatroomsAll(chatInfo: ChatroomAdd[]) {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL" as const,
    chatInfo: chatInfo,
  };
}

export function loadChatroomsAllStart() {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL_START" as const,
  };
}

export function loadChatroomsAllEnd() {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL_END" as const,
  };
}

export function loadChatroomsAllError(error: string) {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL_ERROR" as const,
    error: error,
  };
}

// fetch all chatroom here
export function fetchChatroomsAll(id: number) {
  return (dispatch: AppDispatch) => {
    // side effects welcome
    dispatch(loadChatroomsAllStart());
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/all`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadChatroomsAll(data));
        dispatch(loadChatroomsAllEnd());
      })
      .catch((error) => {
        dispatch(loadChatroomsAllError(error.message));
      });
  };
}
// get recommend chatroom
export function loadChatroomsRecommend(chatInfo: ChatroomAdd[]) {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECOMMEND" as const,
    chatInfo,
  };
}

export function loadChatroomsRecommendStart() {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECOMMEND_START" as const,
  };
}

export function loadChatroomsRecommendEnd() {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECOMMEND_END" as const,
  };
}

export function loadChatroomsRecommendError(error: string) {
  return {
    type: "@@chatroom/LOAD_CHATROOMS_RECOMMEND_ERROR" as const,
    error: error,
  };
}

// fetch recommend chatroom here
export function fetchChatroomsRecommend(id: number) {
  return (dispatch: AppDispatch) => {
    // side effects welcome
    dispatch(loadChatroomsRecommendStart());
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/recommend`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadChatroomsRecommend(data));
        dispatch(loadChatroomsRecommendEnd());
      })
      .catch((error) => {
        dispatch(loadChatroomsRecommendError(error.message));
      });
  };
}

export type ChatroomAddActions =
  | ReturnType<typeof loadChatroomsAll>
  | ReturnType<typeof loadChatroomsAllStart>
  | ReturnType<typeof loadChatroomsAllEnd>
  | ReturnType<typeof loadChatroomsAllError>
  | ReturnType<typeof loadChatroomsRecommend>
  | ReturnType<typeof loadChatroomsRecommendStart>
  | ReturnType<typeof loadChatroomsRecommendEnd>
  | ReturnType<typeof loadChatroomsRecommendError>;
