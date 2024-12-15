import React, { useState } from "react";

const Search = ({ users, searchUser }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query);
    setQuery(query);
    searchUser(query);
  };

  return (
    <form className="search-form full-width" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for robos..."
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </form>
  );
};

export default Search;
