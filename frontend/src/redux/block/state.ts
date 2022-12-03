export interface BlockListState {
  blockedUserList: Array<number>;
  error?: string;
}

export const initialState: BlockListState = {
  blockedUserList: [],
};

// export type BlockedUser = {
//   blockedUserId: number;
// };
