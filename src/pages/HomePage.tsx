import React, { useEffect, useState } from 'react';
import BookPost from '../components/Book/BookPost';
import ImageSlider from '../components/ImageSlider';
import '../index.css';
import { useNavigate} from 'react-router-dom';
import {Book} from "../services/api";


const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate(); 
  const handleLogout = () => { 
    // Perform logout actions here (e.g., clear session, remove authentication token) 
    // After logout, redirect to the login page 
    console.log("Te has deslogeado");
    history('/'); 
}; 

  useEffect(() => {
    fetch('http://127.0.0.1:8080/bookShare/books/list')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return <p>Loading...</p>;
  }
  
  console.log(books.map((book) => (
    <BookPost
      author={book.book_author}
      book_condition={book.book_condition}
      book_description={book.book_description}
      key={book.book_id}
      location={book.book_location}
      title={book.book_title}
      category_id={book.category_id}
      createdAt={book.created_at}
      updatedAt={book.updated_at}
      user_id={book.userId} 
      book_id={book.book_id}
      book_image={book.book_image}
      />
  )))
  return (
    <div className="home-page">
      <ImageSlider />
      <h1>Libros disponibles para solicitar:</h1>
      <div className="text-center"> 
                    <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button> 
                </div> 
               
                
      <div className="container">
        {books.map((book) => (
          <BookPost
            key={book.book_id}
            category_id={book.category_id}
            title={book.book_title}
            author={book.book_author}
            book_description={book.book_description}
            book_condition={book.book_condition}
            location={book.book_location}
            createdAt={book.created_at}
            updatedAt={book.updated_at}
            user_id={book.userId}
            book_id={book.book_id} 
            book_image={book.book_image}/>
        ))}
      </div>
      
    </div>
  );
};

export default HomePage;
