import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import noPic from './no-profile-alt.jpg'
import { Modal } from '../context/Modal'


function User() {
  const { userId }  = useParams();
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)

  const current_user = useSelector((state) => state.session.user.id)
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const res_user = await fetch(`/api/users/${userId}`);
      const res_following = await fetch(`/api/follow/${userId}/following`);
      const res_followers = await fetch(`/api/follow/${userId}/followers`);
      const res_posts = await fetch(`/api/posts/user/${userId}`);

      const user = await res_user.json();
      const following = await res_following.json();
      const followers = await res_followers.json();
      const posts = await res_posts.json();

      setUser(user);
      setFollowing(following);
      setFollowers(followers);
      setPosts(posts)
    })();
  }, [userId]);

  if (!user) {
    return null;
  }
  let validated = false

  if (+userId === current_user) {
    validated = true
  }

  return (
    <>
      <ul>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Posts:</strong> {posts.posts?.length || 0}
        </li>
        <li>
          <strong>Followers:</strong> {Object.keys(followers).length || 0}
        </li>
        <li>
          <strong>Following:</strong> {Object.keys(following).length || 0}
        </li>
      </ul>
      <div>
        <img src={user.profile_picture || noPic} style={{"height": "50px", "width": "50px"}} alt='profile-picture'></img>
      </div>
      {validated &&
        (
          <div>
            <button onClick={() => setShowModal(true)}>Edit Profile</button>
          </div>
        )
      }
    </>
  );
}
export default User;
