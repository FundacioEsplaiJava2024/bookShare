import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, fetchBooks, Book, User } from "../services/api";

interface SearchBarProps {
  setSearchResults: (results: (Book | User)[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchResults }) => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("books");
  const [keywords, setKeywords] = useState<string[]>([]);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!input.trim()) return; // No hacer nada si el input está vacío

    console.log("handle search");
    console.log("filter ", filter);

    try {
      let response;
      if (filter === "books") {
        response = await fetchBooks();
      } else {
        response = await fetchUsers();
      }

      console.log("response ", response);

      // Convertir input en una lista de palabras clave
      const keywords = input.toLowerCase().split(/\s+/);
      setKeywords(keywords);

      // Filtrar resultados según las palabras clave
      const filteredResults = response.filter((item: Book | User) => {
        const textToSearch = filter === "books"
          ? (item as Book).book_title.toLowerCase()
          : (item as User).name.toLowerCase();

        return keywords.every(keyword => textToSearch.includes(keyword));
      });

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
        setInput(""); // Limpiar input
        setKeywords([]); // Limpiar palabras clave
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
        <option value="books">Libros</option>
        <option value="users">Usuarios</option>
      </select>
      <input
        type="text"
        placeholder={`Busca por ${filter}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
