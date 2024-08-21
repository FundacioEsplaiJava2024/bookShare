import React from "react";
import { ContactUsers } from '../../services/api';

interface ContactProfileProps {
  contact: ContactUsers;  // El componente ahora espera un objeto `contact` de tipo `ContactUsers`
}

const ContactProfile: React.FC<ContactProfileProps> = ({ contact }) => {
  const { phone_number, email, address, city, state, country, postal_code } = contact;

  return (
    <div className="user-header">
      <div className="profile-info">
        <p><strong>Teléfono:</strong> {phone_number}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Dirección:</strong> {city}, {state}, {country} - {postal_code}</p>
      </div>
    </div>
  );
};

export default ContactProfile;
