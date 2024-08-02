import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../services/api';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookById(Number(id)).then(setBook);
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>titulo del libro{/*book.title*/}</h1>
      <p>autor{/*book.author*/}</p>
      <p>Lorem ipsum dolor sit amet consecteus quam id vitae inventore eaque dolor. Nihil, deleniti?{/*book.description*/}</p>
      <p>en buen estado{/*book.condition*/}</p>
      <p>barcelona{/*book.location*/}</p>
    </div>
  );
};

export default BookDetailPage;
