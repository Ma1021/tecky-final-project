export interface ChatroomRecord {
  recordid: number;
  record: string;
  userid: number;
  username: string;
  created_at: string;
  useravatar: string;
  chatroomid: number;
  chatroomname: string;
}

export interface ChatroomRecordState {
  chatRecord: ChatroomRecord[];
  loading: boolean;
  error?: { statusCode: number; message: string };
}

export const initialChatroomRecordState: ChatroomRecordState = {
  chatRecord: [],
  loading: false,
};
