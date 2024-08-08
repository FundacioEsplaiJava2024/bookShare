import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

const NavBar: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <header>
      <div className='logo'>
        <Link to="/HomePage"><img src="img/originLogo.jpeg" alt="index" /></Link>
      </div>
      <div className="search-bar-container">
        <SearchBar setSearchResults={setSearchResults} />
        <div className="search-results">
          {searchResults.map(result => (
            <div className='result' key={result.id}>
              {result.book_title ? result.book_title : result.name}
            </div>
          ))}
        </div>
      </div>
      <nav>
        <Link to="/somos">Quienes somos?</Link>
        <Link to="/edit-profile">Perfil</Link>
        <Link to="/auth">NombreUsuario</Link>
        <Link to="/BookForm">Añadir Libro </Link>
      </nav>
    </header>
  );
};

export default NavBar;
