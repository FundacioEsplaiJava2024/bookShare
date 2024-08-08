import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookList from '../components/Book/BookList';
import { fetchBooksByCategory } from '../services/api';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState([]);

  useEffect(() => {
   // fetchBooksByCategory(category).then(setBooks);
  }, [category]);

  return (
    <div>
      <h1>Books in {category}</h1>
      <BookList books={books} />
    </div>
  );
};

export default CategoryPage;
