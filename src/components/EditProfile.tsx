import React, { useEffect, useState } from 'react';
import UserProfile from './User/UserProfile';
import BookProfile from './Book/BookProfile';
import ContactProfile from './Contacts/ContactProfile';
import AddContact from './Contacts/AddContact'; // Importa el nuevo componente
import '../EditProfile.css';
import { Book, User, ContactUsers } from '../services/api';

const EditProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [contacts, setContactUser] = useState<ContactUsers[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddContact, setShowAddContact] = useState(false); // Estado para mostrar el formulario de añadir contacto

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

  const handleAddContact = (newContact: ContactUsers) => {
    setContactUser((prevContacts) => [...prevContacts, newContact]); // Añade el nuevo contacto a la lista
    setShowAddContact(false); // Cierra el formulario después de añadir
  };

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
              user_id={user.user_id}/>
          ))}
        </div>

        {/* Nueva sección para mostrar los datos de contacto del usuario */}
        <div className="contact-info">
          <h3>Detalles de Contacto</h3>
          {Array.isArray(contacts) && contacts.map((contact) => (
            <ContactProfile
              key={contact.userId}
              contact={contact}
              onUpdateContact={handleAddContact} // Asegúrate de tener esta función
            />
          ))}
          <button onClick={() => setShowAddContact(!showAddContact)}>
            {showAddContact ? 'Cancelar' : 'Añadir Contacto'}
          </button>
          {showAddContact && <AddContact onAddContact={handleAddContact} />}
        </div>
      </div>
      <div className="column user-books">
        <h2>Libros del Usuario</h2>
        <div className="books-list">
          {Array.isArray(books) && books.map((book) => (
            <BookProfile
              key={book.book_id}
              book={book}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
