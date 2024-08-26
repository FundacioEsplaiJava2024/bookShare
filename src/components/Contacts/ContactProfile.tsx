import React, { useState, useEffect } from "react";
import { ContactUsers, updateContact } from '../../services/api';

interface ContactProfileProps {
  contact: ContactUsers | null; // If no contact exists initially, it will be null
}

const ContactProfile: React.FC<ContactProfileProps> = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState<ContactUsers | null>(contact);
  const [isContactAdded, setIsContactAdded] = useState(!!contact); // State to track if the contact is added
  const handleUpdateContact = (updatedContact: ContactUsers) => {
    setContactData(updatedContact);
    setIsContactAdded(true); // O cualquier otra lógica que necesites
  };

  // Update contact data when contact prop changes
  useEffect(() => {
    setContactData(contact);
    setIsContactAdded(!!contact); // Set isContactAdded based on whether contact exists
  }, [contact]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    } as ContactUsers));
  };

  const handleUpdate = async () => {
    try {
      if (contactData) {
        const updatedContact = await updateContact(contactData); // Asegúrate de que esto actualiza el contacto existente
        handleUpdateContact(updatedContact); // Llama a la función local para actualizar el contacto en el estado local
        setIsEditing(false); // Salir del modo de edición
      }
    } catch (error) {
      console.error('Error actualizando el contacto:', error);
    }
  };

  const handleAddContact = async () => {
    try {
      if (contactData) {
        // Simulate adding contact API call
        console.log('Contact added:', contactData);
        
        // Update the state to reflect that the contact has been added
        setIsContactAdded(true);

        // Optionally, call an API to save the new contact
        // await addContact(contactData); 
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className="user-header">
      {isEditing ? (
        <div className="user-header-inf">
          <input
            type="text"
            name="phone_number"
            value={contactData?.phone_number || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            value={contactData?.email || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            value={contactData?.address || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            value={contactData?.city || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            value={contactData?.state || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            value={contactData?.country || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postal_code"
            value={contactData?.postal_code || ""}
            onChange={handleInputChange}
          />
          <button className="bookPost" onClick={handleUpdate}>Actualizar</button>
          <button className="bookPost" onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div className="profile-info">
          {isContactAdded ? (
            <>
              <p><strong>Teléfono:</strong> {contactData?.phone_number}</p>
              <p><strong>Email:</strong> {contactData?.email}</p>
              <p><strong>Dirección:</strong> {contactData?.address}, {contactData?.city}, {contactData?.state}, {contactData?.country} - {contactData?.postal_code}</p>
              {/* Show Edit button if contact has been added */}
              <button className="bookPost" onClick={() => setIsEditing(true)}>Editar</button>
            </>
          ) : (
            <p>No hay contacto. Por favor, añade un contacto.</p>
          )}
        </div>
      )}

      {/* Show Add Contact button only if no contact has been added */}
      {!isContactAdded && (
        <button className="bookPost" onClick={handleAddContact}>Añadir Contacto</button>
      )}
    </div>
  );
};

export default ContactProfile;