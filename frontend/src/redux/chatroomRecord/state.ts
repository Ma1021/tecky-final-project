import ChatroomAddCard from "../../components/Chatroom/ChatroomAddCard";
import img from "../../img/animal_stand_ookami.png";

export interface ChatroomRecord {
  recordid: number;
  record: string;
  userid: number;
  username: string;
  created_at: string;
  useravatar: string;
  chatroomid: number;
}

export interface ChatroomRecordState {
  chatRecord: ChatroomRecord[];
  loading: boolean;
  error?: string;
}

export const initialChatroomRecordState: ChatroomRecordState = {
  chatRecord: [],
  loading: false,
};
