import React, { useEffect, useState } from 'react'
import './Follower.scss'
import Avatar from '../Avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollowUser } from '../../redux/slices/feedDataSlice'
import { useNavigate } from 'react-router-dom'
const Follower = ({user}) => {
   const dispatch = useDispatch();
   const[isFollowing , setIsFollowing] = useState(false);
  const feedData = useSelector(state => state.feedDataSlice.feedData)
   useEffect(()=>{
      setIsFollowing(feedData?.following.find(item => item._id === user._id))
   },[feedData])


   
   const navigate = useNavigate()
   function handleFollowClick(){
      
      dispatch(followAndUnfollowUser({
         userIdTofollow : user._id
      }))
   }
  return (
     <div className="follower" >
       <span onClick={()=>navigate(`/profile/${user?._id}`)}><Avatar src = {user?.avatar?.url}/>
        <h4 className="name">{user?.name}</h4></span> 
        <h5 className={isFollowing ? 'unfollow-btn' : 'follow-btn'} onClick={handleFollowClick}> {isFollowing ? 'Unfollow' : 'Follow'}</h5>
     </div>
  )
}

export default Follower