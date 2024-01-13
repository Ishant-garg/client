import React   from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import './Post.scss'
 
import Avatar from '../Avatar/Avatar'
import { useDispatch  } from 'react-redux';
 
import { likeUnlikePost } from '../../redux/slices/postsSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App';
const Post = ({post}) => {
  const createdAt = new Date(post?.createdAt); // Assuming createdAt is the timestamp from the database
  const dispatch = useDispatch();
 

  // Function to format the time difference
  const formatTimeDifference = (timestamp) => {
    const now = new Date();
    const timeDifference = now - timestamp;
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };
  function handleLikeClick(){
    !post?.isLiked ? dispatch(showToast({
      type : TOAST_SUCCESS,
      message : 'like'
    })) : dispatch(showToast({
      type : TOAST_SUCCESS,
      message : 'Unlike'
    }))
     dispatch(likeUnlikePost({
      postId : post._id
     }))
     
  }
  //()=> navigate(`/profile/${post?.owner?._id}`)
 const navigate = useNavigate()
 
  // console.log('from post.jsx' , post)
  return (
    <>
    <div className="post">
        <div className="heading"  onClick={()=>navigate(`/profile/${post?.owner?._id}`)}>
       <span> <Avatar src={post?.owner?.avatar?.url}  /></span>
        <h4 >{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="" />
        </div>
        <div className="footer">
            <div className="like-section" onClick={() => handleLikeClick()}>
            {post?.isLiked ?  <FaHeart className='icon' style={{color:'red'}} /> :<FaRegHeart className='icon'  /> 
}
            <h4>{post?.likesCount} likes</h4>
        </div>
            <p className='caption'>{post?.caption}</p>
            <h6>{formatTimeDifference(createdAt)}</h6>
           
        </div>
    </div>
    </>
  )
}

export default Post