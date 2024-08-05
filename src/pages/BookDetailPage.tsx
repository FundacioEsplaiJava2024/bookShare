import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
  createdAt: string;
}

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="book-detail-page">
      <h1>{book.title}</h1>
      <h4>by {book.author}</h4>
      <p>{book.description}</p>
      <p><strong>Condition:</strong> {book.condition}</p>
      <p><strong>Location:</strong> {book.location}</p>
      <p><em>Posted on: {new Date(book.createdAt).toLocaleDateString()}</em></p>
      {/* Aquí puedes agregar más detalles o acciones, como un botón para contactar al donante */}
    </div>
  );
};

export default BookDetailPage;
