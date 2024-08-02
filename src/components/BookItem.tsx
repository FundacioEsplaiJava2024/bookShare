import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
}

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>{book.condition}</p>
      <p>{book.location}</p>
    </div>
  );
};

export default BookItem;
