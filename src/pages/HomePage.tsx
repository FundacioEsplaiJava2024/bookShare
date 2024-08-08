import React, { useEffect, useState } from 'react';
import BookPost from '../components/BookPost';
import ImageSlider from '../components/ImageSlider';
import '../index.css';
import { useNavigate} from 'react-router-dom'; 

interface Book {
  book_author: string;
  book_condition: string;
  book_description: string;
  book_id: number;
  book_location: string;
  book_title: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  book_image: string;
}

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate(); 
  const handleLogout = () => { 
    // Perform logout actions here (e.g., clear session, remove authentication token) 
    // After logout, redirect to the login page 
    history('/HomePage'); 
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
  <div className="text-center"> 
                    <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button> 
                </div> 
  console.log(books.map((book) => (
    <BookPost
      author={book.book_author}
      condition={book.book_condition}
      description={book.book_description}
      key={book.book_id}
      location={book.book_location}
      title={book.book_title}
      category_id={book.category_id}
      createdAt={book.created_at}
      updatedAt={book.updated_at}
      user_id={book.user_id} 
      id={book.book_id}
      book_image={book.book_image}
      />
  )))
  return (
    <div className="home-page">
      <ImageSlider />
      <h1>Libros disponibles para solicitar:</h1>
      <div className="container">
        {books.map((book) => (
          <BookPost
            key={book.book_id}
            category_id={book.category_id}
            title={book.book_title}
            author={book.book_author}
            description={book.book_description}
            condition={book.book_condition}
            location={book.book_location}
            createdAt={book.created_at}
            updatedAt={book.updated_at}
            user_id={book.user_id}
            id={book.book_id} 
            book_image={book.book_image}/>
        ))}
      </div>
      
    </div>
  );
};

export default HomePage;
