import React from 'react';
import UserItem from './UserItem';

interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    update_at: string;
    user_image: string;
}

interface UserListProps{
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div>
            {users.map(user => (
                <UserItem key={user.user_id} user={user} />
            ))}
        </div>
    );
};

export default UserList;