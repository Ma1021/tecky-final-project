import { AppDispatch } from "../store";
import { BlockListState } from "./state";
// import { BlockListState, BlockedUser } from "./state";

// export function updateBlockUser(blockedUserList: BlockedUser[]) {
export function updateBlockUser(blockedUserList: number[]) {
  return {
    type: "@@block/UPDATE_BLOCK" as const,
    blockedUserList: [...blockedUserList],
  };
}
export function updateBlockUserError(error: string) {
  return {
    type: "@@block/UPDATE_BLOCK_ERROR" as const,
    error: error,
  };
}

export function fetchGetBlockList(userId: number) {
  return (dispatch: AppDispatch) => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/block`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("get return data:", data);
        dispatch(updateBlockUser(data));
      })
      .catch((error) => {
        dispatch(updateBlockUserError(error.message));
      });
  };
}
export function fetchBlockList(block: {
  userId: number;
  blockedUserId: number;
}) {
  return (dispatch: AppDispatch) => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/${block.blockedUserId}/block`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: block.userId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateBlockUser(data));
      })
      .catch((error) => {
        dispatch(updateBlockUserError(error.message));
      });
  };
}

export function fetchUnblockList(unblock: {
  userId: number;
  unblockedUserId: number;
}) {
  return (dispatch: AppDispatch) => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/${unblock.unblockedUserId}/unblock`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: unblock.userId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateBlockUser(data));
      })
      .catch((error) => {
        dispatch(updateBlockUserError(error.message));
      });
  };
}

export type BlockActions =
  | ReturnType<typeof updateBlockUser>
  | ReturnType<typeof updateBlockUserError>;
