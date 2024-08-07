import React, { useState } from "react";
import axios from "axios";
import { fetchBooks, fetchUsers } from "../services/api";

interface SearchBarProps {
  setSearchResults: (results: any[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchResults }) => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("books");

  const handleSearch = async () => {
    if (filter === "books") {
      const results = await fetchBooks();
      const filteredResults = results.filter((book: any) =>
        book.book_title.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      const results = await fetchUsers();
      const filteredResults = results.filter((user: any) =>
        user.name.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="input-wrapper">
      <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="users">Usuarios</option>
        <option value="books">Libros</option>
      </select>
      <input
        type="text"
        placeholder="Busca por libros"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
