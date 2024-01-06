import React from 'react'
import './Avatar.scss'
import userImg from './user.png'
const Avatar = ({src}) => {
  return (
    <div className='Avatar'>
        <img src={src ? src : userImg } alt="user" />
    </div>
  )
}

export default Avatar 