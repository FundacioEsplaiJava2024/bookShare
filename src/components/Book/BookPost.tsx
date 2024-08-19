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

const BookPost: React.FC<BookPostProps> = (book) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookData, setBookData] = useState({
    book_title: book.title,
    book_author: book.author,
    book_description: book.description,
    book_condition: book.book_condition,
    book_location: book.location,
    book_image: book.book_image
  });

  return (
    <div>
        <div>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.description}</p>
          <p>{book.book_condition}</p>
          <p>{book.location}</p>
          <img src={book.book_image} alt={book.title} />
          <br />
        </div>
    </div>
  );
};

export default BookPost;
