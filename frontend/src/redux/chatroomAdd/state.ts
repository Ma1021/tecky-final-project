export interface ChatroomAdd {
  id: number;
  host: string;
  name: string;
  type: "public" | "private";
  created_at: string;
  updated_at: string;
  member_count: number;
  introduction: string;
  icon: string;
  loading: boolean;
  error: string;
}

export interface ChatroomAddState {
  chatInfo: ChatroomAdd[];
  loading: boolean;
  error?: string;
}

export const initialChatroomAddState: ChatroomAddState = {
  chatInfo: [],
  loading: false,
};
