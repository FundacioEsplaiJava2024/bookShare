import React, { useState } from 'react';
import { createBook } from '../../services/api';


const BookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [userId, setUserId] = useState(sessionStorage.getItem("userId")); // This should be dynamically set based on logged-in user
    
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBook = {
            userId: userId,
            book_id: 1,// Set appropriate book_id
            category_id: 1, // Set appropriate category_id
            book_title: title,
            book_author: author,
            book_description: description,
            book_condition: condition,
            book_location: location,
            created_at: '2024-08-05 10:16:56',
            updated_at: '2024-08-05 10:16:56',
            book_image: 'public/books_images/Baldor.jpg',
        };
      
        try {
          await createBook(newBook);
          alert('Libro agregado correctamente!');
          // Limpiar el formulario
          setTitle('');
          setAuthor('');
          setDescription('');
          setCondition('');
          setLocation('');
        } catch (error) {
          alert('Error al agregar libro');
        }
      };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
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
            <div>
                <label>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Condition:</label>
                <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            <button type="submit">Post Book</button>
        </form>
    );
};


export default BookForm;
