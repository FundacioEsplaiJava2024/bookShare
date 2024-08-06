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
          <ul>
            <li><img src="/img/email.png" alt="email" /> <p>support@bookshare.com</p></li>
            <li> <img src="/img/call.png" alt="call" /> <p>(+34) 000-000-000</p></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Siguenos:</h4>
          <ul>
            <li><a href="https://www.facebook.com"> <img src="/img/facebook.png" alt="facebook" /> Facebook</a></li>
            <li><a href="https://www.twitter.com"> <img src="/img/twitter.png" alt="twitter" /> Twitter</a></li>
            <li><a href="https://www.instagram.com"> <img src="/img/instagram.png" alt="instagram" /> Instagram</a></li>          
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BookShare. Todos losd erechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
