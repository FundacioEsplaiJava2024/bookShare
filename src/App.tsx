import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/footer';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';
import BookForm from './components/BookForm'; // Importa el componente BookForm
import EditProfile from './components/EditProfile';
const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/BookForm" element={<BookForm />} /> {/* Nueva ruta para BookForm */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* Ruta para EditProfile */}
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;