import React from 'react';

interface BookPostProps {
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
  createdAt: string;
}

const BookPost: React.FC<BookPostProps> = ({ title, author, description, condition, location, createdAt }) => {
  return (
    <div className="book-post">
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <p>{description}</p>
      <p><strong>Condition:</strong> {condition}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><em>Posted on: {new Date(createdAt).toLocaleDateString()}</em></p>
    </div>
  );
};

export default BookPost;
