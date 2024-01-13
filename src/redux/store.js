import { configureStore } from "@reduxjs/toolkit";
import  appConfigReducer  from "./slices/appConfigSlice"
import postsSlice from "./slices/postsSlice";
import feedDataSlice from "./slices/feedDataSlice";
export default configureStore({
    reducer:{
        appConfigReducer,
        postsSlice,
        feedDataSlice

    }
})