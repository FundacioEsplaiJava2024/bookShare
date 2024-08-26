import React, { useState, useEffect } from 'react';
import { ContactUsers } from '../../services/api'; // Asumiendo que tienes esta función
import ContactProfile from './ContactProfile';

const ContactDetailsPage = ({  }) => {
  const [contact, setContact] = useState<ContactUsers | null>(null);

  useEffect(() => {
    const loadContact = async () => {
    };
    loadContact();
  }, []);

  const handleUpdateContact = (updatedContact: ContactUsers) => {
    setContact(updatedContact);
  };

  if (!contact) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <ContactProfile contact={contact} onUpdateContact={handleUpdateContact} />
    </div>
  );
};

export default ContactDetailsPage;