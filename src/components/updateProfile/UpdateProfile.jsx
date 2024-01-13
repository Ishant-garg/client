import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss'
// import userImg from '../Avatar/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { showToast, updateMyProfile } from '../../redux/slices/appConfigSlice'

import axiosClient from '../../utils/axiosClient'
import { useNavigate } from 'react-router-dom'
import { TOAST_SUCCESS } from '../../App'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/manageLocalStorage'
const UpdateProfile = () => {

  const myProfile = useSelector(store => store.appConfigReducer.myProfile)
  const[name , setName] = useState('');
  const[bio , setBio] = useState('');
  const[img , setImg] = useState('');

  useEffect(()=>{
    setName(myProfile?.name || '')
    setBio(myProfile?.bio || '')
    setImg(myProfile?.avatar?.url)
  },[myProfile])
  function handleImgChange(e){
    const file = e?.target?.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>{
        if(fileReader.readyState === fileReader.DONE){
          setImg(fileReader.result)
        }
    }

  }
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      img
      
    }));
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message : 'Profile Updated'
    }))
  };
  const navigate = useNavigate()
  
  async function handleDelete() {
    try {
     await axiosClient.delete('/user/delete');
 
    
   } catch (e) {
       
    }
    finally{
      dispatch(showToast({
        type:TOAST_SUCCESS,
        message : 'User Deleted Successfully'
      }))
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/')
    }
  }
  
  return (

    <div className="update-profile container">
        <div className="left-side">
           
            <input type="file" accept='image/*' id="file" onChange={handleImgChange} />
            <label htmlFor="file"> <img src={img} alt="" /></label>
        </div>
        <div className="right-side">
                <form onSubmit={handleSubmit} >
            <div className="update-container">

                <input value={name} type="text" placeholder='Your name' onChange={(e) => setName(e.target.value)} />
                <input value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />

                <button onClick={handleSubmit}>Submit</button>
            </div>
              </form>

            <button onClick={handleDelete}>Delete Account</button>
        </div>
    </div>
  )
}

export default UpdateProfile