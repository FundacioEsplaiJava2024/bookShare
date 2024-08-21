import React, { useState } from 'react';
import { Book, ContactUsers } from '../../services/api';  // Importamos las interfaces desde api.tsx

interface BookPostProps {
  book: Book; // Utilizamos la interfaz Book directamente
}

const BookPost: React.FC<BookPostProps> = ({ book }) => {
  const [contactInfo, setContactInfo] = useState<ContactUsers | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch contact info when the user clicks the button
  const handleRequestBook = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/bookShare/contact/${book.userId}`);
      const data: ContactUsers = await response.json();  // Usamos la interfaz ContactUsers para definir el tipo de respuesta
      setContactInfo(data);
      setShowModal(true); // Mostrar modal una vez que tengamos la info de contacto
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };

  return (
    <div className="book-post">
      <img src={`${book.book_image}`} alt="Imagen del libro" />
      <div className="details">
        <div className="InfBook">
          <h2>{book.book_title}</h2>
          <p>Por: {book.book_author}</p>
          <p>Descripción: {book.book_description}</p>
          <p>Categoría: {book.category_id}</p>
          <p><strong>Condición:</strong> {book.book_condition}</p>
          <p><strong>Ubicación:</strong> {book.book_location}</p>
          <p><em>Publicado el: {new Date(book.created_at).toLocaleDateString()}</em></p>
          <p>Publicado por el usuario: {book.userId}</p>
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
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPost;
