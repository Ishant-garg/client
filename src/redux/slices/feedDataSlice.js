import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeUnlikePost } from "./postsSlice";
import { useDispatch } from "react-redux";

 
export const getfeedData = createAsyncThunk('user/getfeedData ' , async(_ , thunkApi)  =>{
    try {
        thunkApi.dispatch(setLoading(true))
        const response = await axiosClient.get('/user/getfeedData' )
        console.log( (response?.result))
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        thunkApi.dispatch(setLoading(false))
    }

})
export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollowUser ' , async(body , thunkApi)  =>{
    try {
        thunkApi.dispatch(setLoading(true))
        const response = await axiosClient.post('/user/follow' ,body )
        console.log( ('follow data :',response.result.user))
        return response.result.user
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
  
        thunkApi.dispatch(setLoading(false))
        thunkApi.dispatch(getfeedData())
    }

})
 
const feedSlice = createSlice({
    name : 'feedSlice',
    initialState : { 
        feedData : {}
    },

    
    extraReducers : (builder) =>{
        builder.addCase(getfeedData.fulfilled , (state , action) =>{
            state.feedData = action.payload 
    }).addCase(likeUnlikePost.fulfilled , (state , action) =>{
        const post = action.payload;
        const index = state?.feedData?.posts?.findIndex(item =>  item._id === post._id);

        if( index!== undefined &&index !== -1){
          state.feedData.posts[index] = post
        }
  }).addCase(followAndUnfollowUser.fulfilled , (state , action) =>{
    const user  = action.payload;
    const index = state?.feedData?.following?.findIndex(item =>  item._id === user._id);

    if( index!== undefined && index !== -1){
        state.feedData?.following?.splice(index,1);
    }
    else{
        state.feedData?.following?.push(user);
    }
   


})    
    },
})

export default feedSlice.reducer
 