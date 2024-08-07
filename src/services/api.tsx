import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/bookShare';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    condition: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }
  
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  export async function fetchBooks() {
    try {
      const response = await axios.get(`${API_URL}/books/list`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching books:', error);
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
    user_id: number,
    
    category_id:number,
    book_title:string,
    book_author:string,
    book_description:string,
    book_condition:string,
    book_location:string,
    created_at:null,
    updated_at:null,
  }) : Promise<Book|undefined>{
    try {
      const response = await axios.post(`${API_URL}/books/add`, bookData);
      console.log('Libro agregado', response.data);
      return response.data as Book;
    } catch(error) {
      console.error('Error al agregar el libro', error);
    }
  }

 export async function createUser(newUser:{
  name:string,
  password:string,
  email:string,
 }) : Promise <User|undefined>{
 try{
  const response = await axios.post(`${API_URL}/users/add`, newUser);
  console.log('Usuario agregado',response.data);
  return response.data as User;
 }catch(error) {
  console.error('Error al agregar usuario', error);
}
}
export async function loginUser(credentials: {
  email:string,
  password: string,
}): Promise<User | undefined> {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    console.log('Login exitoso', response.data);
    return response.data as User;
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
    const response = await fetch(`${API_URL}/users`);
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
  
  export const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user with id ${id}`);
    }
  };
    