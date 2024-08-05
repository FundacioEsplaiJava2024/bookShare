import React, { useState } from 'react';
import { createBook } from '../services/api';

const BookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState(1); // This should be dynamically set based on logged-in user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      description,
      condition,
      location,
      userId,
    };

    try {
      await createBook(newBook);
      alert('Book posted successfully!');
      // Clear the form
      setTitle('');
      setAuthor('');
      setDescription('');
      setCondition('');
      setLocation('');
    } catch (error) {
      alert('Failed to post book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
        
      <button type="submit">Post Book</button>
    </form>
  );
};

export default BookForm;
