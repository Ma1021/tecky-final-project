export type ChatroomListState = {
  list: ChatroomState[];
};

export type ChatroomState = {
  id: number | null;
  host: string | null;
  name: string | null;
  last_msg: string | null;
  last_time: string | null;
  last_user: string | null;
  avatar: string | null;
  head_count: number | null;
  introduction: string | null;
  is_entered: boolean | null;
};

// export const initialState: ChatroomListState = {
//   list: [
//     {
//       id: null,
//       host: null,
//       name: null,
//       last_msg: null,
//       last_time: null,
//       last_user: null,
//       avatar: null,
//       head_count: null,
//       introduction: null,
//       is_entered: null,
//     },
//   ],
// };

export interface ChatroomAddState {
  id: number | null;
  host: string | null;
  name: string | null;
  type: "public" | "private" | null;
  created_at: string | null;
  updated_at: string | null;
  member_count: number | null;
  introduction: string | null;
  icon: string | null;
}

export const initialChatroomDisplayState: ChatroomAddState = {
  id: null,
  host: null,
  name: null,
  type: null,
  created_at: null,
  updated_at: null,
  member_count: null,
  introduction: null,
  icon: null,
};

// data
const chatroomEntered = [
  {
    id: 1,
    host: "金牌豹姐",
    name: "豹姐炒股達人組",
    last_msg: "好彩無賭錢",
    last_time: "23:23",
    last_user: "最後的人",
    avatar: img,
    head_count: 5124,
    introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
    is_entered: true,
  },
  {
    id: 2,
    host: "金牌cat姐",
    name: "個名起得唔夠長就做唔到testing",
    last_msg: "好彩無賭錢",
    last_time: "10:44",
    avatar: img,
    head_count: 1170,
    introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
    last_user: "最後的人",
    is_entered: true,
  },
  {
    id: 3,
    host: "金牌dog姐",
    name: "dog姐炒股達人組",
    last_msg: "好彩有賭錢",
    last_time: "23:23",
    avatar: img,
    head_count: 4,
    introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
    last_user: "最後的人",
    is_entered: false,
  },
  {
    id: 4,
    host: "金牌豹姐",
    name: "豹姐炒股達人組",
    last_msg: "好彩無賭錢",
    last_time: "23:23",
    avatar: img,
    head_count: 154,
    introduction: "助大家發堀投資機會",
    last_user: "最後的人",
    is_entered: false,
  },
  {
    id: 5,
    host: "金牌豹姐",
    name: "豹姐炒股達人組",
    last_msg: "好彩無賭錢",
    last_time: "23:23",
    avatar: img,
    head_count: 8124,
    introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
    last_user: "最後的人",
    is_entered: false,
  },
];

export const initialState: ChatroomListState = {
  list: chatroomEntered,
};
