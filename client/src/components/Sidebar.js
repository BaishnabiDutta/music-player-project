import "./Sidebar.css";

export default function Sidebar({
  activeSection,
  setActiveSection,
}) {
  const isAdmin =
  localStorage.getItem(
    "isAdmin"
  ) === "true";
    const hasnoToken = localStorage.getItem("token") ? false : true;
  return (
    <div className="sidebar">
      {/* LOGO */}
      <h1 className="logo">
        Algorythm
      </h1>

      {/* MENU */}
      <div className="menu">
        <button
          className={
            activeSection ===
            "home"
              ? "active-menu"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "home"
            )
          }
        >
          Home
        </button>

        <button
          className={
            activeSection ===
            "favorites"
              ? "active-menu"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "favorites"
            )
          }
        >
          Favorites
        </button>

        <button
          className={
            activeSection ===
            "playlists"
              ? "active-menu"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "playlists"
            )
          }
        >
          Your Playlists
        </button>

        {/* ADMIN ONLY */}
        {isAdmin && (
          <button
            onClick={() =>
              (window.location.href =
                "/admin")
            }
          >
            Admin
          </button>
        )}


        {hasnoToken && (
          <button
            onClick={() =>
              (window.location.href =
                "/login")
            }
          >
            Login
          </button>
        )}

      </div>
    </div>
  );
}