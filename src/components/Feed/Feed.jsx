import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../Post/Post'
import Follower from '../Follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getfeedData } from '../../redux/slices/feedDataSlice'
const Feed = () => {

  const dispatch = useDispatch();

  const feedData = useSelector(state => state.feedDataSlice.feedData)

  useEffect(()=>{
    dispatch(getfeedData())
  },[dispatch ])

  console.log('feed Data  ff: ' , feedData?.suggestions )
  return (
    <> 
    <div className="feed">
        <div className="container">
            <div className="left-side">
       
            {feedData?.posts?.map(post =>{
                return <Post post= {post} key={post._id}/>
              })}
            </div>
            <div className="right-side">
              <div className="following">
               { feedData?.following?.length > 0  && <h3>You are follwing</h3>}
                {feedData?.following?.map(item=> <Follower user={item} key={item._id}/>)}
              </div>
              <div className="suggestions">
                <h3>Suggestions</h3>
                {feedData?.suggestions?.map(item=> <Follower user={item} key={item._id} />)}
              </div>
             
            </div>
        </div>
    </div>
    </>
  )
}

export default Feed