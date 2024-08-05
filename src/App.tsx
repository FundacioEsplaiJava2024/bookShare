import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/footer';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;