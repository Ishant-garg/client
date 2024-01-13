import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk('user/getMyProfile' , async(body , thunkApi)  =>{
    try {
        thunkApi.dispatch(setLoading(true))
        const response = await axiosClient.get('/user/getMyProfile')
        console.log( (response?.result))
        return response.result
    } catch (error) {
        return Promise.reject()
    }
    finally{
        thunkApi.dispatch(setLoading(false))
    }
})
export const updateMyProfile = createAsyncThunk('user/updateMyProfile' , async(body , thunkApi)  =>{
    try {
        thunkApi.dispatch(setLoading(true))
        const response = await axiosClient.put('/user/' ,body)
        console.log( (response?.result))
        return response.result
    } catch (error) {
        return Promise.reject()
    }
    finally{
        thunkApi.dispatch(setLoading(false))
    }
})
const appConfigSlice = createSlice({
    name : 'appConfigSlice',
    initialState : {
        isLoading : false,
        myProfile : {},
        toastData : {}
    },

    reducers : {
        setLoading : (state ,action)=>{
            state.isLoading = action.payload
        },
        showToast : (state , action) =>{
            state.toastData  = action.payload
        }

    },
    extraReducers : (builder) =>{
        builder.addCase(getMyInfo.fulfilled , (state , action) =>{
            state.myProfile = action.payload?.user
        }).addCase(updateMyProfile.fulfilled , (state , action) =>{
            state.myProfile = action.payload?.user
        })
    }
    
})

export default appConfigSlice.reducer

export const {setLoading , showToast} = appConfigSlice.actions