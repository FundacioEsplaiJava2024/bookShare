import React, { useEffect, useState } from 'react';
import UserProfile from './User/UserProfile';
import BookPost from './Book/BookPost';
import '../EditProfile.css';

interface User {
  user_id: number;
  name: string;
  created_at: string;
  update_at: string;
  user_image: string;
}

interface Book {
  author: string;
  condition: string;
  description: string;
  id: number;
  location: string;
  title: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  book_image: string;
}

const EditProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
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
        data.forEach((book: { id: any; }) => console.log('Book ID:', book.id)); // Verifica los IDs de los libros
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
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
              key={user.user_id}  // Clave única para cada usuario
              name={user.name}
              created_at={user.created_at}
              update_at={user.update_at}
              user_image={user.user_image}
            />
          ))}
        </div>
      </div>

      <div className="column user-books">
        <h2>Libros del Usuario</h2>
        <div className="books-list">
          {Array.isArray(books) && books.map((book) => (
            <BookPost
              key={book.id}  // Clave única para cada libro
              id={book.id}   // Pasando el ID como una prop separada
              title={book.title}
              author={book.author}
              description={book.description}
              condition={book.condition}
              location={book.location}
              category_id={book.category_id}
              createdAt={book.createdAt}
              updatedAt={book.updatedAt}
              user_id={book.user_id}
              book_image={book.book_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
