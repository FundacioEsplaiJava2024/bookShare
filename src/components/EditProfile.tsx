import React, { useEffect, useState } from 'react';
import UserProfile from './User/UserProfile';
import BookProfile from './Book/BookProfile';
import '../EditProfile.css';
import { Book, User, ContactUsers } from '../services/api';

const EditProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [contactUser, setContactUser] = useState<ContactUsers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    // Fetch para obtener la información del usuario
    fetch(`http://127.0.0.1:8080/bookShare/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers([data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });

    // Fetch para obtener los libros del usuario logueado
    fetch(`http://127.0.0.1:8080/bookShare/books/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Response data:', data);
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });

    // Fetch para obtener los datos de contacto del usuario
    fetch(`http://127.0.0.1:8080/bookShare/contacts/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setContactUser(data);
      })
      .catch((error) => {
        console.error('Error fetching contact info:', error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-profile-container">
      <div className="column profile-description">
        <h2>Descripción del Perfil</h2>
        <div className="profile-header">
          {Array.isArray(users) && users.map((user) => (
            <UserProfile
              key={user.user_id}
              name={user.name}
              created_at={user.created_at}
              update_at={user.update_at}
              user_image={user.user_image}
            />
          ))}
        </div>

        {/* Nueva sección para mostrar los datos de contacto del usuario */}
        <div className="contact-info">
          <h3>Detalles de Contacto</h3>
          {contactUser ? (
            <div>
              <p><strong>Teléfono:</strong> {contactUser.phone_number}</p>
              <p><strong>Email:</strong> {contactUser.email}</p>
              <p><strong>Dirección:</strong> {contactUser.address}, {contactUser.city}, {contactUser.state}, {contactUser.country} - {contactUser.postal_code}</p>
            </div>
          ) : (
            <p>No se han encontrado detalles de contacto.</p>
          )}
        </div>
      </div>

      <div className="column user-books">
        <h2>Libros del Usuario</h2>
        <div className="books-list">
          {Array.isArray(books) && books.map((book) => (
            <BookProfile
              key={book.book_id}
              user_id={book.userId}
              book_id={book.book_id}
              category_id={book.category_id}
              title={book.book_title}
              author={book.book_author}
              description={book.book_description}
              book_condition={book.book_condition}
              location={book.book_location}
              createdAt={book.created_at}
              updatedAt={book.updated_at}
              book_image={book.book_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
