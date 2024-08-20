import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { Book, User } from '../services/api'; // Importa las interfaces si es necesario

const NavBar: React.FC = () => {
  const [searchResults, setSearchResults] = useState<(Book | User)[]>([]);
  const [userName, setUserName] = useState<string | null>(null); // Estado para el nombre del usuario
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para manejar la apertura del dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName); // Establece el nombre del usuario en el estado
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Alternar entre abrir y cerrar el dropdown
  };

  const handleLogout = () => {
    // Manejar el cierre de sesión
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header>
      <div className='logo'>
        <Link to="/HomePage"><img src="img/originLogo.png" alt="index" /></Link>
      </div>
      <div className="search-bar-container">
        <SearchBar setSearchResults={setSearchResults} />
      </div>
      <nav>
        <Link to="/somos">Quienes somos?</Link>
        {/* Dropdown para el perfil */}
        <div className="dropdown">
          <a onClick={toggleDropdown} className="dropdown-button">
            {userName ? userName : 'Perfil'} {/* Mostrar el nombre del usuario o "Perfil" */}
          </a>
          {dropdownOpen && ( // Si el estado `dropdownOpen` es verdadero, muestra el menú
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
