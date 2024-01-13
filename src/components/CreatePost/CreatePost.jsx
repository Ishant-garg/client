import React, { useEffect, useState } from 'react'
import './CreatePost.scss'
import { FaImage } from "react-icons/fa6";

import Avatar from '../Avatar/Avatar'
import axiosClient from '../../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, showToast } from '../../redux/slices/appConfigSlice';
import { getUserProfile } from '../../redux/slices/postsSlice';
import { TOAST_SUCCESS } from '../../App';
const CreatePost = () => {
    const myProfile = useSelector(store => store.appConfigReducer.myProfile)

    const[img , setImg] = useState('');
    const[caption , setCaption] = useState('');
    const dispatch = useDispatch()
  

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

      async function handleSubmit() {
        try{
            dispatch(setLoading(true))
            const result = await axiosClient.post( '/posts' , {
                caption,
                img
            })
            
            dispatch(getUserProfile({
                userId : myProfile._id
            }))
            // console.log('post done' ,result)
            dispatch(showToast({
                type:TOAST_SUCCESS,
                message : 'Post Created'
            }))
        }
        
        catch(e){   
            console.log('error in post making ' , e)
        }
        finally{
            setImg('');
            setCaption('');
            dispatch(setLoading(false))
          
        }
      }

      useEffect(() => {
        // This effect will run after loading state is updated
        setImg('');
        setCaption('');
      }, [dispatch]);

  return (
    <div>
        <div className="create-post">
            <div className="top-bar">
                <Avatar src={myProfile?.avatar?.url}/>

                <input value={caption} type="text" name="" id=""  placeholder='What is happening!?' onChange={e => setCaption(e.target.value)}  />
            </div>


            {img  &&  <div className="post-img">
                <img src={img} alt="" />
            </div>}

            <div className="bottom-bar">
                <div className="postSelect">
                <input type="file" accept='image/*' id="file" onChange={handleImgChange} />
            <label htmlFor="file"> <FaImage  className='icon hover-links' /> </label>
                </div>
                
                <button className='hover-links' onClick={handleSubmit}>POST</button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost