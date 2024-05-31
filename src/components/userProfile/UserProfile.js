import React from "react";
import "./userProfile.css";

const UserProfile = ({otherId}) => {
  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src={otherId.image} alt="User Profile" />
        </div>
        <h4>{otherId.name}</h4>
        <p>Email:{otherId.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
