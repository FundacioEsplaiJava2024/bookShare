import React from 'react';
import ContactItem from './ContactItem';

interface Contact {
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

interface ContactListProps{
    contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
    return (
        <div>
            {contacts.map(contact => (
                <ContactItem key={contact.contact_id} contact={contact} />
            ))}
        </div>
    );
};

export default ContactList;