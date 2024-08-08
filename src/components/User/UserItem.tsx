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
            <p>{user.user_id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <p>{user.created_at}</p>
            <p>{user.update_at}</p>
            <p>{user.user_image}</p>
        </div>
    );
};

export default UserItem;