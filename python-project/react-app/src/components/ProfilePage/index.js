import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

function ProfilePage() {
    const dispatch = useDispatch()

    const current_user = useSelector(state => state.session.user)
    const user = useSelector(state => state.user.user)
    const follows = useSelector(state => state.follows)

    console.log(follows);
    if (user.id === current_user.id) {
        return (
            <div className='profile-page-user-info-container'>
                <p>Username: {user.username}</p>
                <button>Edit Profile</button>
                <p>Followers: {user.followers}</p>
                <p>Posts: {user.posts}</p>
                <p>Following: {user.following}</p>
            </div>
        )
    }
}

export default ProfilePage;
