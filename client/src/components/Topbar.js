import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import "./Topbar.css";

import {
  FaUserCircle,
} from "react-icons/fa";

function Topbar({
  search,
  setSearch,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [
    showDropdown,
    setShowDropdown,
  ] = useState(false);

  const dropdownRef =
    useRef(null);

  // CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {
          setShowDropdown(
            false
          );
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // LOGOUT
  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "email"
      );

      localStorage.removeItem(
        "isAdmin"
      );

      localStorage.removeItem(
        "likedSongs"
      );

      setIsLoggedIn(false);

      window.location.reload();
    };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <p>
          Where code meets
          rhythm
        </p>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {/* PROFILE */}
        <div
          className="profile-section"
          ref={dropdownRef}
        >
          <button
            className="profile-btn"
            onClick={() =>
              setShowDropdown(
                !showDropdown
              )
            }
          >
            <FaUserCircle />
          </button>

          {showDropdown &&
            isLoggedIn && (
              <div className="profile-dropdown">
                <button
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;