import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import Footer from './components/footer';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';
import NavBar from './components/NavBar';
import BookForm from './components/BookForm';
import EditProfile from './components/EditProfile';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/auth" Component={AuthForm} />
        <Route path="/BookForm" element={<BookForm />} /> {/* Nueva ruta para BookForm */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* Ruta para EditProfile */}        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;