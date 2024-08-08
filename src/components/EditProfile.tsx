import React, { useEffect, useState } from 'react';
import UserProfile from './User/UserProfile';
import '../EditProfile.css'; // Importa el archivo CSS

interface User {
  user_id: number;
  name: string;
  created_at: string;
  update_at: string;
  user_image: string;
}

const EditProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/bookShare/users/1')
      .then((response) => response.json())
      .then((data) => {
        setUsers([data]);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  const posts = [
    { id: 1, title: 'Publicación 1', content: 'Contenido de la publicación 1.' },
    { id: 2, title: 'Publicación 2', content: 'Contenido de la publicación 2.' },
    { id: 3, title: 'Publicación 3', content: 'Contenido de la publicación 3.' },
    { id: 4, title: 'Publicación 4', content: 'Contenido de la publicación 4.' },
    { id: 5, title: 'Publicación 5', content: 'Contenido de la publicación 5.' },
  ];
if (loading) {
  return <p>Loading...</p>;
}
console.log(Array.isArray(users) && users.map((user) => (
  <UserProfile
    key={user.user_id}
    name={user.name}
    created_at={user.created_at}
    update_at={user.update_at}
    user_image={user.user_image}
  />
)))
  return (
    <div className="edit-profile-container">
      <div className="column profile-description">
        <h2>Descripción del Perfil</h2>
        <div className="profile-header">
          {
            Array.isArray(users) && users.map((user) => (
              <UserProfile
                key={user.user_id}
                name={user.name}
                created_at={user.created_at}
                update_at={user.update_at}
                user_image={user.user_image}
              />
            ))
          }
        </div>
      </div>

      <div className="column user-posts">
        <h2>Publicaciones realizadas</h2>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No hay publicaciones realizadas.</p>
        )}
      </div>

      <div className="column latest-posts">
        <h2>Últimas Publicaciones</h2>
        {posts.length > 0 ? (
          posts.slice(0, 3).map(post => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No hay últimas publicaciones.</p>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
