import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./redux/reducers/noteSlice"

export const store = configureStore({
    reducer: noteReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch