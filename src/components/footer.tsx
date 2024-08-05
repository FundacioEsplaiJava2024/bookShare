import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sobre nosotros</h4>
          <p>
          BookShare es una plataforma comunitaria para compartir recursos educativos. </p>
          <p>Dona tus libros viejos y ayuda a alguien que lo necesite.</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p> support@bookshare.com</p>
          <p> (+34) 000-000-000</p>
        </div>
        <div className="footer-section">
          <h4>Siguenos:</h4>
          <p>
            <a href="https://www.facebook.com">Facebook</a>
            <a href="https://www.twitter.com">Twitter</a>
            <a href="https://www.instagram.com">Instagram</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BookShare. Todos losd erechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
