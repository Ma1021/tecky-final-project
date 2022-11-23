import { ChatroomState } from "./state";

export function getEnteredChatList(chatInfo: ChatroomState) {
  console.log("get Chat List");
  console.log({
    type: "@@chatroom/chatroomEntered" as const,
    chatInfo,
  });
  return {
    type: "@@chatroom/chatroomEntered" as const,
    chatInfo,
  };
}

export function getRecommendedChatList(chatInfo: ChatroomState) {
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

export function getAllChatList(chatInfo: ChatroomState) {
  console.log("get Chat List recommendation");
  console.log({
    type: "@@chatroom/chatroomAll" as const,
    chatInfo,
  });
  return {
    type: "@@chatroom/chatroomAll" as const,
    chatInfo,
  };
}

export function quitChat(chatInfo: ChatroomState) {
  console.log("del Chat List");
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
  | ReturnType<typeof getEnteredChatList>
  | ReturnType<typeof getRecommendedChatList>
  | ReturnType<typeof getAllChatList>
  | ReturnType<typeof quitChat>;
