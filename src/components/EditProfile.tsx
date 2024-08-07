import React from 'react';
import '../EditProfile.css'; // Importa el archivo CSS

const EditProfile: React.FC = () => {
  // Datos simulados
  const profile = {
    username: 'usuarioEjemplo',
    description: '¡Hola! Soy un usuario de ejemplo. Este es un perfil ficticio para propósitos de demostración.',
    profilePicture: 'public/users_images/canario.jpg' // Ruta a la imagen de perfil
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
      <div className="column profile-description">
        <h2>Descripción del Perfil</h2>
        <div className="profile-header">
          <img
            src={`../../${profile.profilePicture}`}
            alt={`${profile.username}'s profile`}
            className="profile-picture"
          />
          <div className="profile-info">
            <p><strong>Usuario:</strong> {profile.username}</p>
            <p>{profile.description}</p>
          </div>
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
