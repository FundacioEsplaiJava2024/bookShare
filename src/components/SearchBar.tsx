// src/components/SearchBar.tsx

import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, fetchBooks, fetchUserBooks, Book, User } from "../services/api";
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
      let filteredResults: (Book | User)[] = [];

      if (filter === "books") {
        const books = await fetchBooks();
        const keywords = input.toLowerCase().split(/\s+/);
        setKeywords(keywords);

        filteredResults = books.filter((book: Book) =>
          keywords.every(keyword => book.book_title.toLowerCase().includes(keyword))
        );
      } else {
        const users = await fetchUsers();
        const keywords = input.toLowerCase().split(/\s+/);
        setKeywords(keywords);

        for (const user of users) {
          const isMatch = keywords.every(keyword =>
            user.name.toLowerCase().includes(keyword)
          );

          if (isMatch) {
            // Agregar el usuario a los resultados
            filteredResults.push(user);

            // Fetch and add the user's books
            const userBooks = await fetchUserBooks(user.user_id);
            filteredResults = filteredResults.concat(userBooks);
          }
        }
      }

      setSearchResults(filteredResults);
      navigate("/search-results", { state: { searchResults: filteredResults } });
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

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
