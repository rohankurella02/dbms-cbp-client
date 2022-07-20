import React from 'react'
import ProfileUi from 'react-profile-card';
import Avatar from '@mui/material/Avatar';

function Profile() {
    return (
        <div class="card-container">
    <img
        class="round"
        src="https://randomuser.me/api/portraits/lego/5.jpg"
        alt="user"
        style={{width: "195px"}}
    />
    <h3>ROHAN KURELLA</h3>
    <h6>CSE-IOT</h6>
    <p>
        20071A6932 <br />
    </p>
    <div class="buttons">
        <button class="primary">
            Message
        </button>
        <button class="primary ghost">
            Following
        </button>
    </div>
    <div className="skills">

    </div>
</div>
    )
}

export default Profile
