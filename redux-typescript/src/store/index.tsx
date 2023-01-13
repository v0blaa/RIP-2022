import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import medicineReducer from './reducers/medicineListSlice';
import userInfoReducer from './reducers/userInfoSlice';
import statusReducer from "./reducers/statusSlice";

const rootReducer = combineReducers({
    medicineReducer,
    userInfoReducer,
    statusReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

