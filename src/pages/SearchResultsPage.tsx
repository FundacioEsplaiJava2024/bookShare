// src/pages/SearchResultsPage.tsx

import React, { useEffect, useState } from 'react';
import BookPost from '../components/Book/BookPost';
import UserItem from '../components/User/UserItem';
import { useLocation } from 'react-router-dom';
import { Book, User } from '../services/api';
import '../index.css';

const SearchResultsPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<(Book | User)[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).searchResults) {
      setSearchResults((location.state as any).searchResults);
    }
  }, [location.state]);

  const renderUserWithBooks = (user: User) => {
    // Filtrar libros que pertenecen al usuario específico
    const userBooks = searchResults.filter(
      (item) => 'book_id' in item && (item as Book).userId === user.user_id
    ) as Book[];

    return (
      <div key={user.user_id}>
        <UserItem user={user} />
        {userBooks.map((book) => (
          <BookPost
            user_id={book.userId} title={book.book_title} author={book.book_author} location={book.book_location} createdAt={book.created_at} updatedAt={book.updated_at} key={book.book_id}

            {...book}          />
        ))}
      </div>
    );
  };

  return (
    <div className="home-page">
      <h1>Resultados de Búsqueda:</h1>
      <div className="container">
        {searchResults.length > 0 ? (
          searchResults
            .filter((item) => 'user_id' in item) // Filtrar solo usuarios para renderizar
            .map((item) => renderUserWithBooks(item as User))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
