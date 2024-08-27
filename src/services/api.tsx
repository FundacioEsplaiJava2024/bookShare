  import axios from 'axios';

  const API_URL = 'http://127.0.0.1:8080/bookShare';

  export interface Book {
    book_id: number;
    book_title: string;
    book_author: string;
    book_description: string;
    book_condition: string;
    book_location: string;
    created_at: string;
    updated_at: string;
    userId: number;
    category_id: number;
    book_image: string;
  }

  export interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    update_at: string;
    user_image: string;
  }
  export interface ContactUsers {
    
    userId: number;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
  }
  export const updateContact = async (contact: ContactUsers): Promise<ContactUsers> => {
    const response = await fetch(`http://127.0.0.1:8080/bookShare/contacts/update/${contact.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error(`Failed to update contact with id ${contact.userId}`);
    }
    return await response.json();
  };
  export const createContact = async (contactData: ContactUsers): Promise<ContactUsers> => {
    console.log("contact data "+JSON.stringify(contactData));
    const response = await axios.post(`${API_URL}/contacts/add`, contactData);
    return response.data;
};
  export async function fetchBooks() {
    try {
      const response = await axios.get(`${API_URL}/books/list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
  export async function fetchUserBooks(userId: number): Promise<Book[]> {
    try {
      const response = await axios.get(`${API_URL}/books/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user books:', error);
      throw error;
    }
  }
  export async function fetchBookById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }
  }

  export async function fetchBooksByCategory(category: string) {
    try {
      const response = await axios.get(`${API_URL}/books?category=${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books by category:', error);
      throw error;
    }
  }

  export async function createBook(bookData: {
    userId: number | null,
    book_id: number,
    category_id: number,
    book_title: string,
    book_author: string,
    book_description: string,
    book_condition: string,
    book_location: string,
    created_at: string,
    updated_at: string,
    book_image: string
  }): Promise<Book | undefined> {
    try {
      const response = await axios.post(`${API_URL}/books/add`, bookData);
      console.log('Libro agregado', response.data);
      return response.data as Book;
    } catch (error) {
      console.log(bookData);
      console.error('Error al agregar el libro', error);
    }
  }

  export async function createUser(newUser: {
    name: string,
    password: string,
    email: string,
  }): Promise<User | undefined> {
    try {
      const response = await axios.post(`${API_URL}/users/add`, newUser);
      console.log('Usuario agregado', response.data);
      return response.data as User;
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  }

  export async function loginUser(credentials: {
    email: string,
    password: string,
  }): Promise<User | undefined> {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      console.log('Login exitoso', response.data);
      return response.data.user as User;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  }

  export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`Failed to update book with id ${id}`);
    }
    return await response.json();
  };

  export const deleteBook = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete book with id ${id}`);
    }
  };

  export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_URL}/users/list`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  };

  export const fetchUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
    return await response.json();
  };

  export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`Failed to update user with id ${id}`);
    }
    return await response.json();
  };

  export const uploadImage = async (formData: FormData): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtener texto del error
        throw new Error(`Error uploading image: ${errorText}`);
      }

      return await response.text(); // La ruta pública de la imagen
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };
  export const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user with id ${id}`);
    }


  };
