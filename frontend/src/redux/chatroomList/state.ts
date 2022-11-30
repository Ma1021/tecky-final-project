import ChatroomAddCard from "../../components/Chatroom/ChatroomAddCard";
import img from "../../img/animal_stand_ookami.png";

export interface ChatroomList {
  chatroomid: number;
  record: string | null;
  chatroomname: string;
  recordid: number | null;
  userid: number | null;
  username: string | null;
  avatar: string | null;
  record_created_at: string | null;
  chatroomicon: string | null;
  member_count: number | null;
}

export interface ChatroomListState {
  chatroomInfo: ChatroomList[];
  loading: boolean;
  error?: string;
}

export const initialChatroomListState: ChatroomListState = {
  chatroomInfo: [],
  loading: false,
};
