import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/bookShare';

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
