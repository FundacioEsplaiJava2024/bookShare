import React from 'react';

interface BookPostProps {
  user_id: number;
  book_id: number;
  category_id: number;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  book_image: String;
}

const BookPost: React.FC<BookPostProps> = ({ user_id, book_id, category_id, title, author, description, condition, location, createdAt, updatedAt, book_image }) => {
  return (
    <div className="book-post">
      <img src={`../../${book_image}`} alt="prueba" />
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
