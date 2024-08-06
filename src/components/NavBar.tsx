import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <header>
      <div className='logo'>
        <Link to="/"><img src="img/originLogo.jpeg" alt="index" /></Link>
      </div>
      <nav>
        <Link to="/somos">Quienes somos?</Link>
        <Link to="/auth">Acceso/Registro</Link>
         <Link to="/BookForm">Subir Libro</Link> {/* Actualizado el to prop */}
         <Link to="/auth">Acceso/Registro</Link>
         <Link to="/edit-profile">Edit Profile</Link> {/* Botón de Edit Profile */}      
      </nav>
    </header>
  );
};

export default NavBar;
