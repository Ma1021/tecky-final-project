import { AppDispatch } from "../store";
import { ChatroomState, ChatroomAddState } from "./state";

// get all chatroom
export function loadChatroomsAll(chatInfo: ChatroomAddState) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ALL" as const,
    chatInfo,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL" as const,
    chatInfo,
  };
}

export function loadChatroomsAllStart() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ALL_START" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL_START" as const,
  };
}

export function loadChatroomsAllEnd() {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ALL_END" as const,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL_END" as const,
  };
}

export function loadChatroomsAllError(error: string) {
  console.log({
    type: "@@chatroom/LOAD_CHATROOMS_ALL" as const,
    error: error,
  });
  return {
    type: "@@chatroom/LOAD_CHATROOMS_ALL" as const,
    error: error,
  };
}

// fetch all chatroom here
export function fetchChatroomsAll(user: { id: number }) {
  return (dispatch: AppDispatch) => {
    // side effects welcome
    dispatch(loadChatroomsAllStart());
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/all`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user: user!.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadChatroomsAll(data));
        dispatch(loadChatroomsAllEnd);
      })
      .catch((error) => {
        dispatch(loadChatroomsAllError(error));
      });
  };
}

export function getEnteredChatList(chatInfo: ChatroomState) {
  console.log("get Chat List entered");
  console.log({
    type: "@@chatroom/chatroomEntered" as const,
    chatInfo,
  });
  return {
    type: "@@chatroom/chatroomEntered" as const,
    chatInfo,
  };
}

export function getRecommendChatList(chatInfo: ChatroomState) {
  console.log("get Chat List recommendation");
  console.log({
    type: "@@chatroom/chatroomRecommend" as const,
    chatInfo,
  });
  return {
    type: "@@chatroom/chatroomRecommend" as const,
    chatInfo,
  };
}

export function quitChat(chatInfo: ChatroomState) {
  console.log("del Chat List quit");
  console.log({
    type: "@@chatroom/DELETE" as const,
    chatInfo,
  });
  return {
    type: "@@chatroom/DELETE" as const,
    chatInfo,
  };
}

export type ChatroomActions =
  | ReturnType<typeof loadChatroomsAll>
  | ReturnType<typeof loadChatroomsAllStart>
  | ReturnType<typeof loadChatroomsAllEnd>
  | ReturnType<typeof loadChatroomsAllError>
  //to fix
  | ReturnType<typeof getEnteredChatList>
  | ReturnType<typeof getRecommendChatList>
  | ReturnType<typeof quitChat>;
