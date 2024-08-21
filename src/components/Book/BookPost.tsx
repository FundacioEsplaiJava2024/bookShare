import React, { useState, useEffect } from 'react';
import { ContactUsers, Book } from '../../services/api';  // Importamos la interfaz de ContactUsers

interface BookPostProps {
  user_id: number;
  book_id: number;
  category_id: number;
  title: string;
  author: string;
  book_description: string;
  book_condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  book_image: string;
}

const BookPost: React.FC<BookPostProps> = ({ 
  author, 
  book_condition, 
  book_description, 
  location, 
  title, 
  category_id, 
  createdAt, 
  user_id, 
  book_image 
}) => {
  const [contactInfo, setContactInfo] = useState<ContactUsers | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState<string>(''); // Estado para el nombre de usuario

  // Fetch contact info when the user clicks the button
  const handleRequestBook = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/bookShare/contacts/user/${user_id}`);
      const data: ContactUsers = await response.json();  // Usamos la interfaz ContactUsers para definir el tipo de respuesta
      setContactInfo(data);
      setShowModal(true); // Mostrar modal una vez que tengamos la info de contacto
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };
  console.log(contactInfo?.user_id)

  // Fetch user name based on user_id when component mounts
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/bookShare/users/${user_id}`);
        const data = await response.json();
        setUserName(data.name); // Asume que la respuesta tiene un campo `name`
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [user_id]);

  return (
    <div className="book-post">
      <img src={`${book_image}`} alt="Imagen del libro" />
      <div className="details">
        <div className="InfBook">
          <h2>{title}</h2>
          <p>Por: {author}</p>
          <p>Descripción: {book_description}</p>
          <p>Categoría: {category_id}</p>
          <p><strong>Condición:</strong> {book_condition}</p>
          <p><strong>Ubicación:</strong> {location}</p>
          <p><em>Publicado el: {new Date(createdAt).toLocaleDateString()}</em></p>
          <p>Publicado por: {userName || 'Desconocido'}</p> {/* Mostrar el nombre del usuario */}
        </div>
        <div className="buttonContact">
          <button className='bookPost' onClick={handleRequestBook}>Solicitar Libro</button>
        </div>
      </div>

      {/* Modal para mostrar la información de contacto */}
      {showModal && contactInfo && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información de Contacto</h2>
            <p><strong>Teléfono:</strong> {contactInfo.phone_number}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Dirección:</strong> {contactInfo.address}, {contactInfo.city}, {contactInfo.state}, {contactInfo.country}, {contactInfo.postal_code}</p>
            <button className='bookPost' onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPost;
