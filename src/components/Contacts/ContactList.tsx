import React from 'react';
import ContactItem from './ContactItem';
import { ContactUsers } from '../../services/api';



interface ContactListProps{
    contacts: ContactUsers[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
    return (
        <div>
            {contacts.map(contact => (
                <ContactItem key={contact.userId} contact={contact} />
            ))}
        </div>
    );
};

export default ContactList;