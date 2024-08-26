import React, { useState } from 'react';
import { Book } from '../../services/api';

interface BookProfileProps {
  book: Book;
}

const BookProfile: React.FC<BookProfileProps> = ({ book }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookData, setBookData] = useState({
    book_title: book.book_title,
    book_author: book.book_author,
    book_description: book.book_description,
    book_condition: book.book_condition,
    book_location: book.book_location,
    book_image: book.book_image,
  });
  const [imagePreview, setImagePreview] = useState(book.book_image);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    if (name === 'book_image' && files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
      handleImageUpload(file);
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  const handleImageUpload = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://127.0.0.1:8080/bookShare/image/upload', {
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
      const response = await fetch(`http://127.0.0.1:8080/bookShare/books/update/${book.book_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookData,
          created_at: book.created_at,
          updated_at: new Date().toISOString(),
          userId: book.userId,
        }),
      });

      if (!response.ok) {
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
    <div className='bookPostItem'>
      {isEditing ? (
        <div className='formContainer'>
          <h3>Editar Libro</h3>
          <div className="form-group">
            <input
              type="text"
              name="book_title"
              value={bookData.book_title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="book_author"
              value={bookData.book_author}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="book_description"
              value={bookData.book_description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Descripción del libro"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="book_condition"
              value={bookData.book_condition}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="book_location"
              value={bookData.book_location}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group image-upload">
            <div className="image-preview-container">
              <img src={imagePreview} alt="Book cover" className="image-preview" />
              <i
                className="fas fa-pen edit-icon"
                onClick={() => document.getElementById('file-input')?.click()}
              ></i>
            </div>
            <input
              type="file"
              id="file-input"
              name="book_image"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleInputChange}
            />
          </div>
          <div className="editButtons">
            <button className='bookPost' onClick={handleUpdate}>Actualizar</button>
            <button className='bookPost' onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
         
        </div>
      ) : (
        <div className='book-listDetails'>
          <div className="imgProfile">
            <img src={book.book_image} alt={book.book_title} />
          </div>
          <div className="detailsBookProfile">
            <h2>{book.book_title}</h2>
            <p>Autor: {book.book_author}</p>
            <p>Descripcion: {book.book_description}</p>
            <p>Condicion: {book.book_condition}</p>
            <p>Ubicacion: {book.book_location}</p>
          </div>
        </div>
      )}
      <div className="bookButtons">
        <button className='bookPost' onClick={handleEditClick}>Editar</button>
        <button className='bookPost' onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default BookProfile;
