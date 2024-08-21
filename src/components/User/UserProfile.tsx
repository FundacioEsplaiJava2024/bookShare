import React, { useState } from "react";

interface UserProfileProps {
    user_id: number;
    name: string;
    created_at: string;
    update_at: string;
    user_image: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user_id, name, created_at, update_at, user_image }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (name === 'user_image' && files && files.length > 0) {
            setNewImage(files[0]);
            // Crear una URL de vista previa para la nueva imagen
            setImagePreview(URL.createObjectURL(files[0]));
        }
    };

    const handleImageUpload = async () => {
        if (!newImage) return;

        const formData = new FormData();
        formData.append("image", newImage);

        try {
            const response = await fetch("http://127.0.0.1:8080/bookShare/users/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newImageUrl = await response.text();
                await fetch(`http://127.0.0.1:8080/bookShare/users/update/${user_id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageUrl: newImageUrl, name }), // Mantén el nombre sin cambios
                });
                console.log("Imagen actualizada:", newImageUrl);
                alert("Foto de perfil actualizada correctamente.");
            } else {
                console.error("Error al subir la imagen:", response.statusText);
                alert("Hubo un error al actualizar la imagen.");
            }
        } catch (error) {
            console.error("Error en la carga de la imagen:", error);
            alert("Error en la carga de la imagen.");
        }
    };

    const handleUpdate = async () => {
        await handleImageUpload();
        setIsEditing(false);
    };

    return (
        <div className="user-header">
            {isEditing ? (
                <div>
                    <h3>Editar Perfil</h3>
                    {/* Eliminar el campo de entrada para el nombre */}
                    <input
                        type="file"
                        name="user_image"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                    <button className="bookPost" onClick={handleUpdate}>Actualizar</button>
                    <button className="bookPost" onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <div className="profile-info">
                    <img
                        src={imagePreview || `../../${user_image}`} // Muestra la nueva imagen si hay vista previa, de lo contrario, muestra la imagen actual
                        alt={`${name}'s profile`}
                        className="profile-picture"
                    />
                    <p><strong>Usuario:</strong> {name}</p>
                    <p>Usuario desde el: {created_at}</p>
                   
                </div>
            )}
            {!isEditing && (
                <div className="upload-section">
                    <button className="bookPost" onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
