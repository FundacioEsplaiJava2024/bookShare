import React, { useState } from 'react';
import { createBook, uploadImage } from '../../services/api';
import BookDetailPage from '../../pages/BookDetailPage';

const BookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [userId, setUserId] = useState(sessionStorage.getItem("userId")); // Asume que userId está en sessionStorage
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isImageEditing, setIsImageEditing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = '';
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            imageUrl = await uploadImage(formData);
        }

        const newBook = {
            ...BookDetailPage,
            userId: userId as number | null,
            book_id: 1, // Ajusta según sea necesario
            category_id: 1, // Ajusta según sea necesario
            book_title: title,
            book_author: author,
            book_description: description,
            book_condition: condition,
            book_location: location,
            created_at: new Date().toISOString(), // Fecha actual en formato ISO
            updated_at: new Date().toISOString(), // Fecha actual en formato ISO
            book_image: imageUrl, // Usar la ruta de la imagen
        };

        try {
            await createBook(newBook);
            alert('Libro agregado correctamente!');
            setTitle('');
            setAuthor('');
            setDescription('');
            setCondition('');
            setLocation('');
            setImage(null);
            setImagePreview(null);
            setIsImageEditing(false); // Resetear el estado de edición de imagen
        } catch (error) {
            alert('Error al agregar libro');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setImagePreview(fileReader.result as string);
                setIsImageEditing(false); // Cambiar a false después de seleccionar la imagen
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleEditImage = () => {
        document.getElementById('image-input')?.click();
    };

    return (
        <div className="formContainer">
            <h3>Haz una nueva publicación para una donación:</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titulo:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Autor:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4} // Ajusta el número de filas según sea necesario
                    />
                </div>
                <div className="form-group">
                    <label>Condición:</label>
                    <input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ubicación:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Imagen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image-input"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <div className="image-container">
                        {imagePreview ? (
                            <div className="image-preview-container">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                />
                                <i
                                    className="fas fa-pencil-alt edit-icon"
                                    onClick={handleEditImage}
                                ></i>
                            </div>
                        ) : (
                            <button
                            className='bookPost'
                                type="button"
                                onClick={() => document.getElementById('image-input')?.click()}
                            >
                                Subir Imagen
                            </button>
                        )}
                    </div>
                </div>

                <div className="button-container">
                    <button type="submit" className='bookPost'>Publicar Libro</button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
