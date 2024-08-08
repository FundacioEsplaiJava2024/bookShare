import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { Book, User } from '../services/api'; // Importa las interfaces si es necesario

const NavBar: React.FC = () => {
  const [searchResults, setSearchResults] = useState<(Book | User)[]>([]);

  return (
    <header>
      <div className='logo'>
        <Link to="/"><img src="img/originLogo.jpeg" alt="index" /></Link>
      </div>
      <div className="search-bar-container">
        <SearchBar setSearchResults={setSearchResults} />
        <div></div>
      </div>
      <nav>
        <Link to="/somos">Quienes somos?</Link>
        <Link to="/auth">NombreUser</Link>
        <Link to="/edit-profile">Edit Profile</Link>
      </nav>
    </header>
  );
};

export default NavBar;
