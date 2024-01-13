import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

 
export const getUserProfile = createAsyncThunk('user/getUserProfile ' , async(body , thunkApi)  =>{
    try {
        thunkApi.dispatch(setLoading(true))
        const response = await axiosClient.post('/user/getUserProfile' ,body)
        console.log( (response?.result))
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        thunkApi.dispatch(setLoading(false))
    }
})

export const likeUnlikePost = createAsyncThunk('posts/likeUnlikePost ' , async(body , thunkApi)  =>{
    try {
        thunkApi.dispatch(setLoading(true))
        const response = await axiosClient.post('/posts/like' ,body)
        console.log( (response?.result.UserPost))
        return response?.result?.UserPost
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        thunkApi.dispatch(setLoading(false))
    }
}) 
const postsSlice = createSlice({
    name : 'postsSlice',
    initialState : { 
        userProfile : {}
    },

    
    extraReducers : (builder) =>{
        builder.addCase(getUserProfile.fulfilled , (state , action) =>{
            state.userProfile = action.payload 
    }).addCase(likeUnlikePost.fulfilled , (state , action) =>{
          const post = action.payload;
          const index = state.userProfile?.posts?.findIndex(item =>  item._id === post._id);

          if(index!== undefined && index !== -1){
            state.userProfile.posts[index] = post
          }
    }) 
    },
})

export default postsSlice.reducer
 