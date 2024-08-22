import React from 'react';

interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    update_at: string;
    user_image: string;
}

interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    return (
        <div>
            
            <p>{user.name}</p>
            <p>{user.email}</p>
            
            <p>{user.created_at}</p>
            <p>{user.update_at}</p>
            <img 
                src={user.user_image} 
                alt={`${user.name}'s profile`} 
                className="profile-picture" 
            />
        </div>
    );
};

export default UserItem;