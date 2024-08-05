import React, { useEffect, useState } from 'react';
import BookPost from '../components/BookPost';
import '../index.css';
import { fetchBooks } from '../services/api';

interface Book {
  id: number;
  category_name: string;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/bookShare/books/list')
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
          category_name={book.category_name}
          title={book.title}
          author={book.author}
          description={book.description}
          condition={book.condition}
          location={book.location}
          createdAt={book.createdAt}
          updatedAt={book.updatedAt}
          userName={book.userName}
        />
      ))}
    </div>
  );
};

export default HomePage;
