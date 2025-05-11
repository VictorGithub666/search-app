import React, { useState } from "react";

function Lookup({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center mb-4"
    >
      <input
        type="text"
        className="form-control me-2 rounded-pill w-50"
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="btn btn-danger rounded-pill px-4" type="submit">
        Search
      </button>
    </form>
  );
}

export default Lookup;
