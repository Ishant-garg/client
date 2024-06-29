import {  Route, Routes } from "react-router-dom";
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from "./components/home/Home";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

import RequiredUser from "./components/RequiredUser";

import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
 

export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'

const App = () => {
  const ref = useRef(null);
  const isLoading = useSelector((store) => store.appConfigReducer.isLoading);
  const toastData = useSelector((store) => store.appConfigReducer.toastData);

  useEffect(() => {
    if (isLoading) {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [isLoading]);

  useEffect(()=>{
    switch(toastData?.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
          if(toastData.message !== undefined) toast.error(toastData.message);
          break;
       default :
          
          break;
    }

  },[toastData])
   
  return (
    <>
      <LoadingBar color='#5f9fff' ref={ref} />
      <div><Toaster/></div>

      <Routes>
        

            <Route element={<OnlyIfNotLoggedIn/>}>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Route>
      {/* <Route path="/login" element={<Login/>}/> */}
        <Route element = {<RequiredUser/>}>
            <Route element={<Home/>}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/profile/:userId" element={<Profile/>}/>
              <Route path="/updateProfile" element={<UpdateProfile/>}/>

            </Route>

        </Route>
       
      </Routes>
    </>
  );
};

export default App;
