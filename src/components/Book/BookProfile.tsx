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
    book_image: book.book_image,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'book_image' && files && files.length > 0) {
      handleImageUpload(files[0]);
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  const handleImageUpload = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://127.0.0.1:8080/bookShare/books/upload', {
        method: 'POST',
        body: formData,
      });
      const imageUrl = await response.text();
      setBookData((prevData) => ({ ...prevData, book_image: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      // Imprimir los datos que se enviarán al servidor
      console.log('Datos enviados al servidor:', {
        ...bookData,
        created_at: book.createdAt,
        updated_at: new Date().toISOString(), // Actualiza la fecha actual
        userId: book.user_id,
      });

      const response = await fetch(`http://127.0.0.1:8080/bookShare/books/update/${book.book_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookData,
          created_at: book.createdAt,
          updated_at: new Date().toISOString(), // Cambia a la fecha actual
          userId: book.user_id,
        }),
      });

      if (!response.ok) {
        // Si la respuesta no es 2xx, lanza un error
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

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
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className='book-listItem'>
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
            type="file"
            name="book_image"
            accept="image/*"
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className='book-listDetails'>
          <div className="imgProfile">
            <img src={book.book_image} alt={book.title} />
          </div>
          <div className="detailsBookProfile">
            <h2>{book.title}</h2>
            <p>Autor: {book.author}</p>
            <p>Descripcion: {book.description}</p>
            <p>Condicion: {book.book_condition}</p>
            <p>Ubicacion: {book.location}</p>
          </div>
        </div>
      )}
      <div className="bookButtons">
        <button onClick={handleEditClick}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default BookProfile;
