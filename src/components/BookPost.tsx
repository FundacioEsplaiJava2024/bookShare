import React from 'react';

interface BookPostProps {
  author: string;
  condition: string;
  description: string;
  id: number;
  location: string;
  title: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

const BookPost: React.FC<BookPostProps> = ({ author, condition, description, id, location, title, category_id, createdAt, updatedAt, user_id }) => {
  return (
    <div className="book-post">
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <p>{description}</p>
      <p>{category_id}</p>
      <p><strong>Condition:</strong> {condition}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><em>Posted on: {new Date(createdAt).toLocaleDateString()}</em></p>
      <p><em>Updated at: {new Date(updatedAt).toLocaleDateString()}</em></p>
      <p>Post by user: {user_id}</p>
    </div>
  );
};

export default BookPost;
