import React, { useState } from 'react';
import { ContactUsers, createContact } from '../../services/api'; // Asegúrate de tener esta función

interface AddContactProps {
  onAddContact: (newContact: ContactUsers) => void; // Callback para añadir el nuevo contacto
}

const AddContact: React.FC<AddContactProps> = ({ onAddContact }) => {
  const [contactData, setContactData] = useState<ContactUsers>({
    contact_id: 0, // o un valor que tu API maneje
    user_id: 0,    // también puede ser 0 o el ID del usuario actual
    phone_number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const newContact = await createContact(contactData); // Asumiendo que tienes esta función para crear un contacto
      onAddContact(newContact);
      setContactData({
        contact_id: 0,
        user_id: 0,
        phone_number: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }); // Resetear el formulario
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div>
      <h3>Añadir Contacto</h3>
      <input type="text" name="phone_number" placeholder="Teléfono" onChange={handleInputChange} />
      <input type="text" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="text" name="address" placeholder="Dirección" onChange={handleInputChange} />
      <input type="text" name="city" placeholder="Ciudad" onChange={handleInputChange} />
      <input type="text" name="state" placeholder="Estado" onChange={handleInputChange} />
      <input type="text" name="country" placeholder="País" onChange={handleInputChange} />
      <input type="text" name="postal_code" placeholder="Código Postal" onChange={handleInputChange} />
      <button onClick={handleAdd}>Añadir</button>
    </div>
  );
};

export default AddContact;
