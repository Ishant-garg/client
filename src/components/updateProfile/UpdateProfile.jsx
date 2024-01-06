import React from 'react'
import './UpdateProfile.scss'
import userImg from '../Avatar/user.png'
const UpdateProfile = () => {
  return (
    <div className="update-profile container">
        <div className="left-side">
            <img src={userImg} alt="" />
        </div>
        <div className="right-side">
            <div className="update-container">
                <input type="text" placeholder='Your name' />
                <input type="text" placeholder='Your Bio' />

                <button>Submit</button>
            </div>

            <button>Delete Account</button>
        </div>
    </div>
  )
}

export default UpdateProfile