import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string, searchType: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title"); // Default to searching by title

  const handleSearch = () => {
    onSearch(searchTerm, searchType);
  };

  return (
    <div className="search" >
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search..."
      />
      <select value={searchType} onChange={(event) => setSearchType(event.target.value)}>
        <option value="title">Title</option>
        <option value="date">Date</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
