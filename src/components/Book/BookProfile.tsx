import React, { useState } from 'react';

interface BookProfileProps {
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

const BookProfile: React.FC<BookProfileProps> = (book) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookData, setBookData] = useState({
    book_title: book.title,
    book_author: book.author,
    book_description: book.description,
    book_condition: book.book_condition,
    book_location: book.location,
    book_image: book.book_image
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      // Lógica de actualización
      await fetch(`http://127.0.0.1:8080/bookShare/books/update/${book.book_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookData, created_at: book.createdAt, updated_at: '2024-08-05 10:16:56', userId: book.user_id }),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://127.0.0.1:8080/bookShare/books/delete/${book.book_id}`, {
        method: 'DELETE',
      });
      alert('El libro ha sido eliminado correctamente.');
      // Aquí puedes manejar la eliminación en la UI, por ejemplo redirigiendo al usuario o actualizando la lista de libros.
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h3>Edit Book</h3>
          <input
            type="text"
            name="book_title"
            value={bookData.book_title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="book_author"
            value={bookData.book_author}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="book_description"
            value={bookData.book_description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="book_condition"
            value={bookData.book_condition}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="book_location"
            value={bookData.book_location}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="book_image"
            value={bookData.book_image}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.description}</p>
          <p>{book.book_condition}</p>
          <p>{book.location}</p>
          <img src={book.book_image} alt={book.title} />
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default BookProfile;
