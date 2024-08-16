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

const BookPost: React.FC<BookPostProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookData, setBookData] = useState({
    title: props.title,
    author: props.author,
    description: props.description,
    condition: props.condition,
    location: props.location,
    book_image: props.book_image
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
      console.log('hola', )
      await fetch(`http://127.0.0.1:8080/bookShare/books/update/${props.book_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookData, updated_at: new Date().toISOString() }),
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
          <h2>{props.title}</h2>
          <p>{props.author}</p>
          <p>{props.description}</p>
          <p>{props.condition}</p>
          <p>{props.location}</p>
          <img src={props.book_image} alt={props.title} />
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default BookPost;
