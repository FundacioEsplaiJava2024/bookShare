import React, { useEffect, useState } from 'react';
import BookPost from '../components/BookPost';
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

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-page">
      <h1>Books Available for Donation</h1>
      {books.map((book) => (
        <BookPost
          key={book.id}
          title={book.title}
          author={book.author}
          description={book.description}
          condition={book.condition}
          location={book.location}
          createdAt={book.createdAt}
        />
      ))}
    </div>
  );
};

export default HomePage;
