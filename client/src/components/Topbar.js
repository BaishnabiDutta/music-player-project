import React from "react";

import "./Topbar.css";

function Topbar({ search, setSearch }) {
  return (
    <div className="topbar">
      {/* LEFT */}

      <div className="topbar-left">
        <p>Where code meets rhythm</p>
      </div>

      {/* RIGHT */}

      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Topbar;
