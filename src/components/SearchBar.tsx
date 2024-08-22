// src/components/SearchBar.tsx

import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, fetchBooks, Book, User } from "../services/api";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  setSearchResults: (results: (Book | User)[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchResults }) => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("books");
  const [keywords, setKeywords] = useState<string[]>([]);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!input.trim()) return;

    try {
      let response;
      if (filter === "books") {
        response = await fetchBooks();
      } else {
        response = await fetchUsers();
      }

      const keywords = input.toLowerCase().split(/\s+/);
      setKeywords(keywords);

      const filteredResults = response.filter((item: Book | User) => {
        const textToSearch = filter === "books"
          ? (item as Book).book_title.toLowerCase()
          : (item as User).name.toLowerCase();

        return keywords.every(keyword => textToSearch.includes(keyword));
      });

      setSearchResults(filteredResults);

      navigate("/search-results", { state: { searchResults: filteredResults } });
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
        setInput("");
        setKeywords([]);
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
