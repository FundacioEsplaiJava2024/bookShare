import React from 'react';

const EditProfile: React.FC = () => {
  // Datos simulados para el perfil y las publicaciones
  const profile = {
    username: 'usuarioEjemplo',
    description: '¡Hola! Soy un usuario de ejemplo. Este es un perfil ficticio para propósitos de demostración.',
  };

  const posts = [
    { id: 1, title: 'Publicación 1', content: 'Contenido de la publicación 1.' },
    { id: 2, title: 'Publicación 2', content: 'Contenido de la publicación 2.' },
    { id: 3, title: 'Publicación 3', content: 'Contenido de la publicación 3.' },
    { id: 4, title: 'Publicación 4', content: 'Contenido de la publicación 4.' },
    { id: 5, title: 'Publicación 5', content: 'Contenido de la publicación 5.' },
  ];

  return (
    <div className="edit-profile-container">
      <div className="profile-description">
        <h2>Descripción del Perfil</h2>
        <p><strong>Usuario:</strong> {profile.username}</p>
        <p>{profile.description}</p>
      </div>

      <div className="user-posts">
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

      <div className="latest-posts">
        <h2>Últimas Publicaciones</h2>
        {posts.length > 0 ? (
          // Mostrar las últimas 3 publicaciones
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
