import React from 'react'
import './Feed.scss'
import Post from '../Post/Post'
import Follower from '../Follower/Follower'
const Feed = () => {
  return (
    <> 
    <div className="feed">
        <div className="container">
            <div className="left-side">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            </div>
            <div className="right-side">
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Feed