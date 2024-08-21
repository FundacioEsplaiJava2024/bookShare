import React from 'react';
import { ContactUsers } from '../../services/api';


interface ContactItemProps {
    contact: ContactUsers;
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
            <p>{contact.updated_at}</p>
        </div>
    );
};

export default ContactItem;