import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Subscription, initialState } from './state';

const userStorage = localStorage.getItem("auth_stockoverflow") as string;
let user_id: number;
if(userStorage) {
    const { user } = JSON.parse(userStorage)
    user_id = +user.id
}

// action that get all followers by user id
export const loadFollowers = createAsyncThunk<Subscription[]>("subscription/loadFollowers", async (_, thunkAPI) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/followers/${user_id}`)
        const json = await res.json();
        return json
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

//action that get all followings by user id
export const loadFollowings = createAsyncThunk<Subscription[]>("subscription/loadFollowings", async (_, thunkAPI) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/followings/${user_id}`)
        const json = await res.json();
        return json
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const loadFollowingsId = createAsyncThunk<number[]>("subscription/loadFollowingId", async (_, thunkAPI) =>{
    try {
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/followings/${user_id}`)
        const json = await res.json();
        const id = [];
        for(let following of json) {
            id.push(following.user_id)
        }
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

//action that follow a user
export const followUser = createAsyncThunk<number, number>("subscription/followUser", async (following_id, thunkAPI) => {
    try {
        const subscriptionRes: Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/subscriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, following_id })
        })

        const subscription_json = await subscriptionRes.json();
        const subscription_id = await subscription_json[0].id;

        // create notification
        const notification = {
            notification_type_id: 3,
            notification_target_id: subscription_id,
            actor_id: user_id,
            notifiers: following_id
        }

        await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notification)
        })

        thunkAPI.dispatch(loadFollowers());
        thunkAPI.dispatch(loadFollowings());
        thunkAPI.dispatch(loadFollowingsId());


        return subscription_json[0].following_id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

//action that UNfollow a user
export const unFollowUser = createAsyncThunk<number, number>("subscription/unFollowUser", async(following_id, thunkAPI)=>{
    try {
        const subscriptionRes: Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/subscriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, following_id })
        })

        thunkAPI.dispatch(loadFollowers());
        thunkAPI.dispatch(loadFollowings());
        thunkAPI.dispatch(loadFollowingsId());

        const subscription_json = await subscriptionRes.json();
        const subscription_id = await subscription_json[0].id;

        // delete notification
        await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({target_id: subscription_id, target_type_id: 3})
        })

        return subscription_json[0].following_id;
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loadFollowers.fulfilled, (state, action) => {
            state.followerList = action.payload;
        })

        builder.addCase(loadFollowings.fulfilled, (state, action) => {
            state.followingList = action.payload;
        })

        builder.addCase(loadFollowingsId.fulfilled, (state, action)=>{
            state.followingIdList = action.payload;
        })
    }
})

const reducer = subscriptionSlice.reducer;
export default reducer;

export const { } = subscriptionSlice.actions