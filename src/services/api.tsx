const API_URL = 'http://localhost:8080/api';

export async function fetchBooks() {
  const response = await fetch(`${API_URL}/books`);
  return response.json();
}

export async function fetchBookById(id: number) {
  const response = await fetch(`${API_URL}/books/${id}`);
  return response.json();
}

export async function fetchBooksByCategory(category: string) {
  const response = await fetch(`${API_URL}/books?category=${category}`);
  return response.json();
}
