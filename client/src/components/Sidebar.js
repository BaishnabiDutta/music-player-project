import React from "react";

import "./Sidebar.css";

function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div className="sidebar">
      <h1 className="logo">🎧 Algorythm</h1>

      <div className="menu">
        <button
          className={activeSection === "home" ? "active-menu" : ""}
          onClick={() => setActiveSection("home")}
        >
          🏠 Home
        </button>

        <button
          className={activeSection === "favorites" ? "active-menu" : ""}
          onClick={() => setActiveSection("favorites")}
        >
          ❤️ Favorites
        </button>

        <button
          className={activeSection === "playlists" ? "active-menu" : ""}
          onClick={() => setActiveSection("playlists")}
        >
          🎵 Your Playlists
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
