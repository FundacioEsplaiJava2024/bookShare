import React, { useState, useEffect } from 'react';
import { ContactUsers, fetchContactById } from '../../services/api'; // Asumiendo que tienes esta función
import ContactProfile from './ContactProfile';

const ContactDetailsPage = ({ contact_id }) => {
  const [contact, setContact] = useState<ContactUsers | null>(null);

  useEffect(() => {
    const loadContact = async () => {
      const fetchedContact = await fetchContactById(contact_id);
      setContact(fetchedContact);
    };
    loadContact();
  }, [contact_id]);

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
