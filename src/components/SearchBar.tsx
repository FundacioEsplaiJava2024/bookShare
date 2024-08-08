import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, fetchBooks } from "../services/api";

interface Book {
  book_id: number;
  book_title: string;
  book_author: string;
}

interface User {
  id: number;
  name: string;
}

interface SearchBarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<(Book | User)[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchResults }) => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("books");
  const [results, setResults] = useState<(Book | User)[]>([]);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!input.trim()) return; // No hacer nada si el input está vacío

    try {
      let response;
      if (filter === "books") {
        response = await fetchBooks();
      } else {
        response = await fetchUsers();
      }
      // Filtrar resultados según la búsqueda
      const filteredResults = response.filter((item: Book | User) =>
        (filter === "books" ? (item as Book).book_title : (item as User).name)
          .toLowerCase()
          .includes(input.toLowerCase())
      );
      setResults(filteredResults);
      setSearchResults(filteredResults); // Actualiza los resultados en el estado padre
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

  // Ocultar resultados y limpiar input al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setResults([]); // Ocultar resultados
        setInput(""); // Limpiar input
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="input-wrapper" ref={inputWrapperRef}>
      <select
        name="filter"
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="Libros">Libros</option>
        <option value="Usuarios">Usuarios</option>
      </select>
      <input
        type="text"
        placeholder={`Busca por ${filter}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div className="search-results">
        {results.map((result, index) => (
          <div className="result" key={index}>
            {filter === "books"
              ? (result as Book).book_title
              : (result as User).name}
          </div>
        ))}
      </div>
    </div>
  );
};
