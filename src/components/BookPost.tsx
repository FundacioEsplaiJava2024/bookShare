import React from 'react';

interface BookPostProps {
  author: string;
  condition: string;
  description: string;
  id: number;
  location: string;
  title: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

const BookPost: React.FC<BookPostProps> = ({ author, condition, description, id, location, title, category_id, createdAt, updatedAt, user_id }) => {
  return (
    <div className="book-post">
      <img src="img/imgLibro.jpg" alt="prueba" />
      <div className="details">
        <h2>{title}</h2>
        <p>Por: {author}</p>
        <p>Descripcion: {description}</p>
        <p>Categoria:{category_id}</p>
        <p><strong>Condicion:</strong> {condition}</p>
        <p><strong>Ubicacion:</strong> {location}</p>
        <p><em>Posted on: {new Date(createdAt).toLocaleDateString()}</em></p>
        <p>Publicado por: {user_id}</p>
      </div>
      
    </div>
  );
};

export default BookPost;
