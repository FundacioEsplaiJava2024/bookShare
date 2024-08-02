import React from 'react';
import BookItem from './BookItem';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
