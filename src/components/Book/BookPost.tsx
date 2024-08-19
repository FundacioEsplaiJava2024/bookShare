import React, { useState } from 'react';

interface BookPostProps {
  user_id: number;
  book_id: number;
  category_id: number;
  title: string;
  author: string;
  description: string;
  book_condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  book_image: string;
}

const BookPost: React.FC<BookPostProps> = ({ author, book_condition, description, location, title, category_id, createdAt, user_id, book_image }) => {
  return (
    <div className="book-post">
      <img src={`../../${book_image}`} alt="prueba" />
      <div className="details">
        <h2>{title}</h2>
        <p>Por: {author}</p>
        <p>Descripcion: {description}</p>
        <p>Categoria:{category_id}</p>
        <p><strong>Condicion:</strong> {book_condition}</p>
        <p><strong>Ubicacion:</strong> {location}</p>
        <p><em>Posted on: {new Date(createdAt).toLocaleDateString()}</em></p>
        <p>Publicado por: {user_id}</p>
      </div>
      
    </div>
  );
};

export default BookPost;
