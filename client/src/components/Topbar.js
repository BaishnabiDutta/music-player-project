import React from "react";
import "./Topbar.css";

function Topbar({ search, setSearch }) {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search songs, artists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Topbar;
