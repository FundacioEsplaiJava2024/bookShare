import React from 'react';

interface Book {
  book_id: number;
  category_name: string;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  book_image: string;
}

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div>
      <p>{book.book_id}</p>
      <h2>{book.title}</h2>
      <p>{book.category_name}</p>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>{book.condition}</p>
      <p>{book.location}</p>
      <p>{book.createdAt}</p>
      <p>{book.updatedAt}</p>
      <p>{book.userName}</p>
      <p>{book.book_image}</p>
    </div>
  );
};

export default BookItem;
