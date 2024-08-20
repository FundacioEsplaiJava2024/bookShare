import React from "react";

interface UserProfileProps {
    name: string;
    created_at: string;
    update_at: string;
    user_image: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, created_at, update_at, user_image}) => {
    return (
        <div className="user-header">
          <img
            src={`../../../public/users_images/${user_image}`}
            alt={`${name}'s profile`}
            className="profile-picture"
          />
          <div className="profile-info">
            <p><strong>Usuario:</strong> {name}</p>
            <p>Usuario desde el: {created_at}</p>
            <p>Ultima actualización: {update_at}</p>
          </div>
        </div>
    );
};

export default UserProfile;