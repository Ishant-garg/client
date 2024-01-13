import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./Profile.scss";
import userImg from "../Avatar/user.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../CreatePost/CreatePost";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedDataSlice";
const Profile = () => {
  const params = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const dispatch = useDispatch();
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);

  const UserProfile = useSelector((store) => store.postsSlice.userProfile);
  const feedData = useSelector(state => state.feedDataSlice.feedData)

  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile({ userId: params.userId }));
    setIsMyProfile(myProfile._id === params.userId);

    setIsFollowing(feedData?.following?.find(item => item._id === params.userId))
  }, [myProfile, params.userId ,feedData]);
  function handleFollowClick() {
    dispatch(
      followAndUnfollowUser({
        userIdTofollow: params.userId,
      })
    );
  }

  console.log("is my profile ", isMyProfile);
  const Allposts = UserProfile.posts;
  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="left-side">
            {isMyProfile && <CreatePost />}

            {Allposts?.map((post) => {
              return <Post post={post} key={post._id} />;
            })}
          </div>
          <div className="right-side">
            <div className="profile-card">
              <div className="profile-img">
                <img
                  className="user-img"
                  src={UserProfile?.avatar?.url || userImg}
                  alt=""
                />
              </div>

              <div className="profile-name">
                <h3>{UserProfile?.name}</h3>
                <p className="bio">{UserProfile?.bio}</p>
              </div>

              <div className="follow-status">
                <div className="followers">
                  <h4> {UserProfile?.followers?.length} </h4>
                  <h4>Followers</h4>
                </div>

                <div className="following">
                  <h4> {UserProfile?.following?.length} </h4>
                  <h4>Following</h4>
                </div>
              </div>

              {!isMyProfile && (
                <h5
                  className={isFollowing ? "unfollow-btn" : "follow-btn"}
                  onClick={handleFollowClick}
                >
                  {" "}
                  {isFollowing ? "Unfollow" : "Follow"}
                </h5>
              )}
              <br />
              {isMyProfile && (
                <Link to="/UpdateProfile">
                  {" "}
                  <button className="update-profile-btn">Update Profile</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
