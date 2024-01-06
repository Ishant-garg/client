import React from 'react'
import { FaRegHeart } from "react-icons/fa";

import './Post.scss'
import backgroundImg from './bgimage.jpg'
import Avatar from '../Avatar/Avatar'
const Post = ({post}) => {
  return (
    <>
    <div className="post">
        <div className="heading">
        <Avatar/>
        <h4>Ishant garg</h4>
        </div>
        <div className="content">
            <img src={backgroundImg} alt="" />
        </div>
        <div className="footer">
            <div className="like-section">
            <FaRegHeart className='icon'/>
            <h4>4 likes</h4>
        </div>
            <p className='caption'>this is caption Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, qui?</p>
            <h6>4 hours ago</h6>
           
        </div>
    </div>
    </>
  )
}

export default Post