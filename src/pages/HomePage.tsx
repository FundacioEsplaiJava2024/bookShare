import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { fetchBooks } from '../services/api';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <main>
      <h1>Bienvenido a BookShare</h1>
      <p>En esta página encontrarás una lista de libros disponibles para compartir.</p>
      <BookList books={books} />
    </main>
  );
};

export default HomePage;
