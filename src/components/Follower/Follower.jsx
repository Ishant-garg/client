import React from 'react'
import './Follower.scss'
import Avatar from '../Avatar/Avatar'
const Follower = () => {
  return (
     <div className="follower">
        <Avatar/>
        <h4 className="name">Ishant</h4>
        <h5 className='follow-btn hover-links'>Follow</h5>
     </div>
  )
}

export default Follower