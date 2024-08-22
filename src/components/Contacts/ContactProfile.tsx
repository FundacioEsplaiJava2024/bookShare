import React, { useState } from "react";
import { ContactUsers, updateContact } from '../../services/api';

interface ContactProfileProps {
  contact: ContactUsers;
  onUpdateContact: (updatedContact: ContactUsers) => void; // Callback for updating contact
}

const ContactProfile: React.FC<ContactProfileProps> = ({ contact, onUpdateContact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState(contact);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleUpdate = async () => {
    // Aquí puedes hacer la llamada a tu API para actualizar el contacto
    // Suponiendo que tienes una función para actualizar un contacto en tu API
    try {
      const updatedContact = await updateContact(contactData); // Esta función debe ser creada en tu API
      onUpdateContact(updatedContact);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="user-header">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="phone_number"
            value={contactData.phone_number}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            value={contactData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            value={contactData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            value={contactData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            value={contactData.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            value={contactData.country}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postal_code"
            value={contactData.postal_code}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Actualizar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Teléfono:</strong> {contact.phone_number}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Dirección:</strong> {contact.address}, {contact.city}, {contact.state}, {contact.country} - {contact.postal_code}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default ContactProfile;
