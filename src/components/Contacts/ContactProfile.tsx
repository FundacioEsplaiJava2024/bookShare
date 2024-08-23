import React, { useState, useEffect } from "react";
import { ContactUsers, updateContact } from '../../services/api';

interface ContactProfileProps {
  contact: ContactUsers;
  onUpdateContact: (updatedContact: ContactUsers) => void; // Callback for updating contact
}

const ContactProfile: React.FC<ContactProfileProps> = ({ contact, onUpdateContact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState(contact);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false); // State to track if the button was clicked

  // Update the contact data when the contact prop changes
  useEffect(() => {
    setContactData(contact);
  }, [contact]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const updatedContact = await updateContact(contactData); // Ensure this updates the existing contact
      onUpdateContact(updatedContact); // Call the parent function to update the contact in the parent state
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleAddContact = async () => {
    try {
      // Logic to add the contact goes here
      console.log('Contact added:', contactData);

      // Simulate adding contact API call
      // await addContact(contactData); // Uncomment this line and implement addContact API call

      // Prevent the button from being clicked again
      setIsAddButtonClicked(true);
    } catch (error) {
      console.error('Error adding contact:', error);
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
          <p><strong>Teléfono:</strong> {contactData.phone_number}</p>
          <p><strong>Email:</strong> {contactData.email}</p>
          <p><strong>Dirección:</strong> {contactData.address}, {contactData.city}, {contactData.state}, {contactData.country} - {contactData.postal_code}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
      {/* Add Contact button */}
      {!isAddButtonClicked && (
        <button onClick={handleAddContact}>Añadir Contacto</button>
      )}
      {isAddButtonClicked && !isEditing && (
        <p>Contacto añadido. Puedes editarlo a continuación.</p>
      )}
    </div>
  );
};

export default ContactProfile;
