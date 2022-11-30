import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Subscription, initialState } from "./state";

// action that get all followers by user id
export const loadFollowers = createAsyncThunk<Subscription[], number>(
  "subscription/loadFollowers",
  async (user_id, thunkAPI) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/user/followers/${user_id}`
      );
      const json = await res.json();
      return json;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//action that get all followings by user id
export const loadFollowings = createAsyncThunk<Subscription[], number>(
  "subscription/loadFollowings",
  async (user_id, thunkAPI) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/user/followings/${user_id}`
      );
      const json = await res.json();
      return json;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loadFollowingsId = createAsyncThunk<number[], number>(
  "subscription/loadFollowingId",
  async (user_id, thunkAPI) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/user/followings/${user_id}`
      );
      const json = await res.json();
      const id = [];
      for (let following of json) {
        id.push(following.user_id);
      }
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//action that follow a user
export const followUser = createAsyncThunk<
  number,
  { following_id: number; user_id: number }
>("subscription/followUser", async (data, thunkAPI) => {
  try {
    console.log(data);
    const subscriptionRes: Response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/subscriptions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: +data.user_id,
          following_id: +data.following_id,
        }),
      }
    );

    const subscription_json = await subscriptionRes.json();
    const subscription_id = await subscription_json[0].id;

    // create notification
    const notification = {
      notification_type_id: 3,
      notification_target_id: subscription_id,
      actor_id: data.user_id,
      notifiers: data.following_id,
    };

    await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notification),
    });

    thunkAPI.dispatch(loadFollowers(+data.user_id));
    thunkAPI.dispatch(loadFollowings(+data.user_id));
    thunkAPI.dispatch(loadFollowingsId(+data.user_id));

    return subscription_json[0].following_id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

//action that UNfollow a user
export const unFollowUser = createAsyncThunk<
  number,
  { following_id: number; user_id: number }
>("subscription/unFollowUser", async (data, thunkAPI) => {
  try {
    console.log(data);
    const subscriptionRes: Response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/subscriptions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: +data.user_id,
          following_id: +data.following_id,
        }),
      }
    );

    thunkAPI.dispatch(loadFollowers(+data.user_id));
    thunkAPI.dispatch(loadFollowings(+data.user_id));
    thunkAPI.dispatch(loadFollowingsId(+data.user_id));

    const subscription_json = await subscriptionRes.json();
    const subscription_id = await subscription_json[0].id;

    // delete notification
    await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_id: subscription_id, target_type_id: 3 }),
    });

    return subscription_json[0].following_id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setFollower: (state, action: PayloadAction<Subscription[]>) => {
      state.followerList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFollowers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadFollowers.fulfilled, (state, action) => {
      state.loading = false;
      state.followerList = action.payload;
    });

    builder.addCase(loadFollowings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadFollowings.fulfilled, (state, action) => {
      state.loading = false;
      state.followingList = action.payload;
    });

    builder.addCase(loadFollowingsId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadFollowingsId.fulfilled, (state, action) => {
      state.loading = false;
      state.followingIdList = action.payload;
    });
  },
});

const reducer = subscriptionSlice.reducer;
export default reducer;

export const { setFollower } = subscriptionSlice.actions;
