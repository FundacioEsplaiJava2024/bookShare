import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <header>
      <div className='logo'>
        <Link to="/src/App.tsx"><img src="/src/img/originLogo.jpeg" alt="index" /></Link>
      </div>
      <nav>
        <Link to="/somos">Quienes somos?</Link>
        <Link to="/perfil">Acceso/Registro</Link>
      </nav>
    </header>
  );
};

export default NavBar;
