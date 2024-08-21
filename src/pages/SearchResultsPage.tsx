// src/pages/SearchResultsPage.tsx

import React, { useEffect, useState } from 'react';
import BookPost from '../components/Book/BookPost';
import { useLocation } from 'react-router-dom';
import { Book } from '../services/api';
import '../index.css';

const SearchResultsPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<(Book | User)[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).searchResults) {
      setSearchResults((location.state as any).searchResults);
    }
  }, [location.state]);

  return (
    <div className="home-page">
      <h1>Resultados de Búsqueda:</h1>
      <div className="container">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <BookPost
              key={item.book_id}
              category_id={item.category_id}
              title={item.book_title}
              author={item.book_author}
              book_description={item.book_description}
              book_condition={item.book_condition}
              location={item.book_location}
              createdAt={item.created_at}
              updatedAt={item.updated_at}
              user_id={item.userId}
              book_id={item.book_id}
              book_image={item.book_image}
            />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
