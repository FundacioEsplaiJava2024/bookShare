import React, { useEffect, useState } from 'react';
import BookPost from '../components/Book/BookPost';
import ImageSlider from '../components/ImageSlider';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { Book } from '../services/api';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

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

  const handleLogout = () => {
    console.log("Te has deslogeado");
    history('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-page">
      <ImageSlider />
      <h1>Libros disponibles para solicitar:</h1>
      <div className="container">
        {books.map((book) => (
          <BookPost
            key={book.book_id}
            category_id={book.category_id}
            title={book.book_title}
            author={book.book_author}
            book_description={book.book_description}
            book_condition={book.book_condition}
            location={book.book_location}
            createdAt={book.created_at}
            updatedAt={book.updated_at}
            user_id={book.userId}
            book_id={book.book_id}
            book_image={book.book_image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
