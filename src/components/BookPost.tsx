import React from 'react';

interface BookPostProps {
  category_name: string;
  title: string;
  author: string;
  description: string;
  condition: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

const BookPost: React.FC<BookPostProps> = ({ category_name, title, author, description, condition, location, createdAt, updatedAt, userName }) => {
  return (
    <div className="book-post">
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <p>{description}</p>
      <p>{category_name}</p>
      <p><strong>Condition:</strong> {condition}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><em>Posted on: {new Date(createdAt).toLocaleDateString()}</em></p>
      <p><em>Updated at: {new Date(updatedAt).toLocaleDateString()}</em></p>
      <p>Post by user: {userName}</p>
    </div>
  );
};

export default BookPost;
