import React from "react";

interface ContactProfileProps {
  contact_id: number;
  user_id: number;
  phone_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  created_at: string;
  update_at: string;
}

const ContactProfile: React.FC<ContactProfileProps> = ({ phone_number, email, address, city, state, country, postal_code }) => {
  return (
    <div className="user-header">
      <div className="profile-info">
        <p><strong>Teléfono:</strong> {phone_number}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Dirección:</strong> {address}, {city}, {state}, {country} - {postal_code}</p>
      </div>
    </div>
  );
};

export default ContactProfile;