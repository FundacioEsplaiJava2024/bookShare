import React from 'react';

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

interface ContactItemProps {
    contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    return (
        <div>
            <p>{contact.contact_id}</p>
            <p>{contact.user_id}</p>
            <p>{contact.phone_number}</p>
            <p>{contact.email}</p>
            <p>{contact.address}</p>
            <p>{contact.city}</p>
            <p>{contact.state}</p>
            <p>{contact.country}</p>
            <p>{contact.postal_code}</p>
            <p>{contact.created_at}</p>
            <p>{contact.update_at}</p>
        </div>
    );
};

export default ContactItem;