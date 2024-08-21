import React, { useState, useEffect } from 'react';

interface BookPostProps {
  user_id: number;
  book_id: number;
  category_id: number;
  title: string;
  author: string;
  book_description: string;
  book_condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  book_image: string;
}

const BookPost: React.FC<BookPostProps> = ({
  author,
  book_condition,
  book_description,
  location,
  title,
  category_id,
  createdAt,
  user_id,
  book_image,
}) => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Función para obtener el nombre del usuario por ID
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/bookShare/users/${user_id}`);
        const data = await response.json();
        setUserName(data.name); // Asume que la respuesta tiene un campo `name`
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };

    fetchUserName();
  }, [user_id]);

  return (
    <div className="book-post">
      <img src={`${book_image}`} alt="prueba" />
      <div className="details">
        <h2>{title}</h2>
        <p>Por: {author}</p>
        <p>Descripción: {book_description}</p>
        <p>Categoría: {category_id}</p>
        <p><strong>Condición:</strong> {book_condition}</p>
        <p><strong>Ubicación:</strong> {location}</p>
        <p><em>Publicado el: {new Date(createdAt).toLocaleDateString()}</em></p>
        <p>Publicado por: {userName || 'Desconocido'}</p> {/* Muestra el nombre del usuario */}
      </div>
    </div>
  );
};

export default BookPost;

