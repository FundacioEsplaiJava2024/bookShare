import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <header>
      <div className='logo'>
        <Link to="/"><img src="" alt="index" /></Link>
      </div>
      <nav>
        <Link to="/somos">Quienes somos?</Link>
        <Link to="/perfil">Mi perfil</Link>
      </nav>
    </header>
  );
};

export default NavBar;
