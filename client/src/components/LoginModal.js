import { useState } from "react";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔐 Save login token (temporary demo login)
    sessionStorage.setItem("token", "demo-token");

    // close modal
    onClose();

    // optional: refresh so app immediately recognizes login
    window.location.reload();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>Login Required</h2>

        <input
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={{ width: "100%", marginBottom: "10px" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          style={{
            width: "100%",
            padding: "8px",
            background: "#ccc",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
