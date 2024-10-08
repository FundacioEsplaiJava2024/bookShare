import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import Footer from './components/footer';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';
import NavBar from './components/NavBar';
import BookForm from './components/Book/BookForm';
import EditProfile from './components/EditProfile';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import SearchResultsPage from './pages/SearchResultsPage'; // Importa la nueva página

const App: React.FC = () => {
  const location = useLocation();

  const shouldShowHeaderAndFooter = location.pathname !== '/';

  return (
    <div>
      {shouldShowHeaderAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/quienes-somos" element={<AboutUs />} />
        <Route path="/BookForm" element={<BookForm />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/search-results" element={<SearchResultsPage />} /> {/* Agrega la ruta para SearchResultsPage */}
      </Routes>
      {shouldShowHeaderAndFooter && <Footer />}
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
