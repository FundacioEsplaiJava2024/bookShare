import React, { useEffect, useState } from 'react';
import UserProfile from './User/UserProfile';
import BookProfile from './Book/BookProfile';
import '../EditProfile.css';

  interface User {
    user_id: number;
    name: string;
    created_at: string;
    update_at: string;
    user_image: string;
  }

  interface Book {
    userId: number;
    book_id: number;
    category_id: number;
    book_title: string;
    book_author: string;
    book_description: string;
    book_condition: string;
    book_location: string;
    created_at: string;
    updated_at: string;
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
          data.forEach((book: { book_id: any, book_title: any; }) => console.log('Book ID:', book.book_id, book.book_title)); // Verifica los IDs de los libros
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
              <BookProfile
                key={book.book_id}  // Clave única para cada libro
                user_id={book.userId}
                book_id={book.book_id}   // Pasando el ID como una prop separada
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
