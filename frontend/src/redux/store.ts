import { legacy_createStore as createStore } from "redux";
// import {combineReducers} from "redux"
import { authReducer } from "./auth/reducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { questionReducer } from "./questions/reducer";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

// export let store = createStore(reducer);
export let store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    question: questionReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
