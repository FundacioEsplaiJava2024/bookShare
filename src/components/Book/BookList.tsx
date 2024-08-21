import React from 'react';
import BookItem from './BookItem';
import { Book } from '../../services/api';


interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      {books.map(book => (
        <BookItem key={book.book_id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
