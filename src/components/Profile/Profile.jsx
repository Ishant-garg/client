import React from 'react'
import Post from '../Post/Post'
import './Profile.scss'
import userImg from '../Avatar/user.png'
import { Link } from 'react-router-dom'
const Profile = () => {
  return (
    <>
     <div className="profile">
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
              <div className="profile-card">
                <div className="profile-img">
                    <img className='user-img' src={userImg} alt="" />
                </div>

                <div className="profile-name">
                  <h3>Ishant Garg</h3>
                </div>

                <div className="follow-status">
                    <div className="followers">
                        <h4>11 </h4>
                        <h4>Followers</h4>
                    </div>

                    <div className="following">
                      <h4>50 </h4>
                      <h4>Following</h4>

                    </div>
                </div>

                <button className="follow-btn">Follow</button>
 <br />
               <Link to='/UpdateProfile'> <button className="update-profile-btn">Update Profile</button></Link>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile