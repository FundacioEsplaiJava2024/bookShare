import React, { useState } from "react";

interface UserProfileProps {
    user_id: number;
    name: string;
    created_at: string;
    update_at: string;
    user_image: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user_id, name, created_at, user_image }) => {
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Manejar cuando seleccionan una nueva imagen
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setNewImage(files[0]);
            setImagePreview(URL.createObjectURL(files[0])); // Vista previa de la imagen seleccionada
        }
    };

    // Subir la nueva imagen al servidor
    const handleImageUpload = async () => {
        if (!newImage) return;

        const formData = new FormData();
        formData.append("image", newImage);

        try {
            const response = await fetch(`http://127.0.0.1:8080/bookShare/image/upload`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newImageUrl = await response.text();
                await fetch(`http://127.0.0.1:8080/bookShare/users/update/${user_id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageUrl: newImageUrl }),
                });
                console.log("Imagen actualizada:", newImageUrl);
                alert("Foto de perfil actualizada correctamente.");
            } else {
                alert("Hubo un error al actualizar la imagen.");
            }
        } catch (error) {
            alert("Error en la carga de la imagen.");
        }
    };

    return (
        <div className="user-header">
            <div className="profile-info">
                <div className="profile-picture-wrapper">
                    <img
                        src={imagePreview || `${user_image}`}
                        alt={`${name}'s profile`}
                        className="profile-picture"
                    />
                    <div className="camera-icon" onClick={() => document.getElementById('imageUpload')?.click()}>
                        <i className="fas fa-camera"></i>
                    </div>
                    <input
                        type="file"
                        id="imageUpload"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                </div>
                <p><strong>Usuario:</strong> {name}</p>
                <p>Usuario desde el: {new Date(created_at).toLocaleDateString()}</p>
            </div>
            {newImage && (
                <div className="upload-section">
                    <button className="bookPost" onClick={handleImageUpload}>Actualizar imagen</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
