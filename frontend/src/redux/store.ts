// import { legacy_createStore as createStore } from "redux";
// import {combineReducers} from "redux"
import { authReducer } from "./auth/reducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import questionReducer from "./questions/questionSlice";
import { themeReducer } from "./theme/theme.reducer";
import subscriptionReducer from "./subscription/subscriptionSlice";
import { chatroomRecordReducer } from "./chatroomRecord/reducer";
import { chatroomAddReducer } from "./chatroomAdd/reducer";
import { chatroomListReducer } from "./chatroomList/reducer";
import { blockReducer } from "./block/reducer";
import { paperTradeReducer } from "./paperTrade/paperTrade.reducer";

export type RootState = ReturnType<typeof store.getState>;

// export let store = createStore(reducer);
export let store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    question: questionReducer,
    chatroomAdd: chatroomAddReducer,
    chatroomList: chatroomListReducer,
    chatroomRecord: chatroomRecordReducer,
    block: blockReducer,
    theme: themeReducer,
    subscription: subscriptionReducer,
    paperTrade: paperTradeReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
