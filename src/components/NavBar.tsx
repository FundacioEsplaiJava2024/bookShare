import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { Book, User } from '../services/api';

const NavBar: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleSearchResults = (results: (Book | User)[]) => {
    navigate('/search-results', { state: { searchResults: results } });
  };

  return (
    <header>
      <div className='logo'>
        <Link to="/HomePage"><img src="img/originLogo.png" alt="index" /></Link>
      </div>
      <div className="search-bar-container">
        <SearchBar setSearchResults={handleSearchResults} />
      </div>
      <nav>
        <Link to="/quienes-somos">Quienes somos?</Link>
        <div className="dropdown">
          <a onClick={toggleDropdown} className="dropdown-button">
            {userName ? userName : 'Perfil'}
          </a>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/edit-profile" onClick={() => setDropdownOpen(false)}>Ver Perfil</Link>
              <Link to="/BookForm" onClick={() => setDropdownOpen(false)}>Añadir Libro</Link>
              <a href="/" onClick={handleLogout}>Cerrar Sesión</a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
