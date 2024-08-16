import React, { useState } from 'react';

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
  book_image: string;
}

const BookPost: React.FC<BookPostProps> = (book) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookData, setBookData] = useState({
    title: book.title,
    author: book.author,
    description: book.description,
    condition: book.condition,
    location: book.location,
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
      // Implement the update logic here
      console.log('hola', bookData)
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

  return (
    <div>
      {isEditing ? (
        <div>
          <h3>Edit Book</h3>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="condition"
            value={bookData.condition}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            value={bookData.location}
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
          <p>{book.condition}</p>
          <p>{book.location}</p>
          <img src={book.book_image} alt={book.title} />
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default BookPost;
