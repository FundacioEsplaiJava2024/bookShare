import React from 'react';
import { Book } from '../../services/api';


interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div>
      <p>{book.book_id}</p>
      <h2>{book.book_title}</h2>
      <p>{book.category_id}</p>
      <p>{book.book_author}</p>
      <p>{book.book_description}</p>
      <p>{book.book_condition}</p>
      <p>{book.book_location}</p>
      <p>{book.created_at}</p>
      <p>{book.updated_at}</p>
      <p>{book.userId}</p>
      <p>{book.book_image}</p>
    </div>
  );
};

export default BookItem;
